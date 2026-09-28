#!/usr/bin/env python3
r"""build_indikator.py — Bangun data 50 indikator turunan IDM 2024 untuk dashboard.

Sumber: hasil scraping API rumusan IDM (repo scrapping-indeks-desa-membangun,
folder hasil_2024). Berkas CSV-nya ~24 MB dan tidak ikut di-commit; yang
di-commit hanya keluaran JSON di data\idm\2024\indikator\:

    meta.json   kamus indikator, 12 sub-dimensi, referensi arti skor, dan
                rerata skor nasional / provinsi / kab-kota (+ sebaran skor)
    <kk>.json   skor per desa untuk satu provinsi, dimuat dashboard saat perlu
    audit.json  cakupan scraping dan hasil pemeriksaan konsistensi

Dua perbaikan atas data sumber (dicatat di audit.json):
  * IKS31 (internet warga) dari API ternyata salinan IKS30 (internet kantor
    desa). Nilai aslinya dipulihkan dari total IKS resmi API:
        IKS31 = API_IKS x 175 - jumlah 34 skor IKS lainnya
    Hasilnya harus bilangan bulat dan termasuk skor sah; bila tidak, dikosongkan.
  * Referensi skor 0 IKL02 bertuliskan "jumlah bencana = 0" (sama dengan skor 5);
    dari kolom KEGIATAN-nya ("identifikasi 3 jenis bencana") yang benar = 3.

Cara pakai (dari akar project):
    .venv\Scripts\python tools\build_indikator.py
    .venv\Scripts\python tools\build_indikator.py --src D:\...\hasil_2024
"""

from __future__ import annotations

import argparse
import csv
import html
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any, Dict, List, Optional

sys.path.insert(0, str(Path(__file__).resolve().parent))
from idm_sources import ROOT  # noqa: E402

YEAR = "2024"
DEFAULT_SRC = ROOT.parent / "scrapping-indeks-desa-membangun" / "hasil_2024"
WIDE = "idm2024_detail_wide.csv"
REFS = "idm2024_referensi_skor.csv"
KAMUS = "idm2024_kamus_indikator.csv"
VALIDASI = "idm2024_validasi.csv"

DIMS = [
    {"k": "IKS", "nm": "Ketahanan Sosial", "div": 175},
    {"k": "IKE", "nm": "Ketahanan Ekonomi", "div": 60},
    {"k": "IKL", "nm": "Ketahanan Lingkungan", "div": 15},
]

# Pengelompokan sub-dimensi tidak ada di data API. Disusun dari struktur dimensi
# IDM (Permendesa PDTT 2/2016) dan urutan nomor indikator 2024.
# (kunci, dimensi, nama lengkap, label pendek radar, nomor indikator)
SUBDIM = [
    ("kes", "IKS", "Kesehatan", "Kesehatan", range(1, 8)),
    ("pdd", "IKS", "Pendidikan", "Pendidikan", range(8, 15)),
    ("mds", "IKS", "Modal sosial", "Modal sosial", range(15, 28)),
    ("pmk", "IKS", "Permukiman", "Permukiman", range(28, 36)),
    ("prd", "IKE", "Keragaman produksi", "Produksi", range(1, 2)),
    ("dag", "IKE", "Perdagangan & jasa", "Perdagangan", range(2, 6)),
    ("log", "IKE", "Distribusi & logistik", "Logistik", range(6, 7)),
    ("keu", "IKE", "Keuangan & kredit", "Keuangan", range(7, 9)),
    ("lek", "IKE", "Lembaga ekonomi", "Kelembagaan", range(9, 10)),
    ("akw", "IKE", "Keterbukaan wilayah", "Aksesibilitas", range(10, 13)),
    ("lkg", "IKL", "Kualitas lingkungan", "Lingkungan", range(1, 2)),
    ("bcn", "IKL", "Kebencanaan", "Kebencanaan", range(2, 4)),
]

LABELS = {
    "IKS01": "Akses sarana kesehatan", "IKS02": "Ketersediaan dokter", "IKS03": "Ketersediaan bidan",
    "IKS04": "Tenaga kesehatan lain", "IKS05": "Kepesertaan BPJS", "IKS06": "Akses poskesdes/polindes",
    "IKS07": "Aktivitas posyandu", "IKS08": "Akses SD/MI", "IKS09": "Akses SMP/MTs",
    "IKS10": "Akses SMA/SMK", "IKS11": "Ketersediaan PAUD", "IKS12": "PKBM/Paket A-B-C",
    "IKS13": "Lembaga kursus", "IKS14": "Taman baca/perpustakaan desa", "IKS15": "Kebiasaan gotong royong",
    "IKS16": "Frekuensi gotong royong", "IKS17": "Ruang publik terbuka", "IKS18": "Kelompok olahraga",
    "IKS19": "Kegiatan olahraga", "IKS20": "Keragaman agama", "IKS21": "Keragaman bahasa",
    "IKS22": "Keragaman komunikasi", "IKS23": "Pos kamling", "IKS24": "Siskamling",
    "IKS25": "Kejadian konflik", "IKS26": "Keberadaan PMKS", "IKS27": "Sekolah luar biasa (SLB)",
    "IKS28": "Akses listrik", "IKS29": "Sinyal telepon seluler", "IKS30": "Internet kantor desa",
    "IKS31": "Internet warga", "IKS32": "Akses jamban", "IKS33": "Pembuangan sampah",
    "IKS34": "Sumber air minum", "IKS35": "Air mandi & cuci",
    "IKE01": "Keragaman produksi", "IKE02": "Pusat pertokoan", "IKE03": "Pasar",
    "IKE04": "Toko/warung kelontong", "IKE05": "Kedai makan & penginapan", "IKE06": "Kantor pos & logistik",
    "IKE07": "Bank & BPR", "IKE08": "Fasilitas kredit", "IKE09": "Koperasi & BUMDes",
    "IKE10": "Transportasi umum", "IKE11": "Jalan tembus roda empat", "IKE12": "Kualitas jalan",
    "IKL01": "Kualitas lingkungan", "IKL02": "Kerawanan bencana", "IKL03": "Fasilitas tanggap bencana",
}

PELAKSANA = [("PELAKSANA_PUSAT", "Pusat"), ("PELAKSANA_PROV", "Provinsi"), ("PELAKSANA_KAB", "Kab/kota"),
             ("PELAKSANA_DESA", "Desa"), ("PELAKSANA_CSR", "CSR"), ("PELAKSANA_LAINNYA", "Lainnya")]

REF_FIX = {("IKL02_RAWAN_BENCANA", 0): (
    "Jenis bencana (longsor, banjir, kebakaran hutan) di desa = 3", None)}

IKS31 = "IKS31_INTERNET_WARGA"

# Alasan desa tanpa data indikator (kode dipakai di <kk>.json, teks di meta.json).
NV_REASONS = [
    ("tahap verifikasi", "Desa belum masuk tahap verifikasi IDM 2024"),
    ("belum diverifikasi", "Data desa belum diverifikasi Kemendesa"),
    ("tidak ditemukan", "ID desa tidak ditemukan di sistem IDM 2024"),
]


def clean(s: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(s or "")).strip()


def num(s: str) -> Optional[float]:
    s = (s or "").strip()
    return float(s) if s else None


def r2(x: float) -> float:
    v = round(x + 1e-9, 2)
    return int(v) if float(v).is_integer() else v


def load_codes() -> Dict[str, Dict[str, Any]]:
    """Kode desa -> {idm} dari data dashboard 2024 yang sudah dibangun build_idm.py."""
    out: Dict[str, Dict[str, Any]] = {}
    pdir = ROOT / "data" / "idm" / YEAR / "prov"
    files = sorted(pdir.glob("*.json"))
    if not files:
        raise SystemExit(f"Tidak ada {pdir}\\*.json — jalankan build_idm.py lebih dulu.")
    for f in files:
        pf = json.loads(f.read_text(encoding="utf-8"))
        for c in pf["kec"]:
            for d in c["ds"]:
                out[c["k"] + d[0]] = {"idm": d[2]}
    return out


def build(src: Path, outdir: Path) -> None:
    for name in (WIDE, REFS, KAMUS, VALIDASI):
        if not (src / name).exists():
            raise SystemExit(f"Berkas sumber tidak ada: {src / name}")

    # ── kamus & referensi ────────────────────────────────────────────────────
    with open(src / KAMUS, encoding="utf-8-sig", newline="") as fh:
        kamus = list(csv.DictReader(fh))
    codes = [r["KODE_INDIKATOR"] for r in kamus]
    if len(codes) != 50:
        raise SystemExit(f"Kamus berisi {len(codes)} indikator, diharapkan 50")
    idx = {c: i for i, c in enumerate(codes)}

    refs: Dict[str, Dict[str, List[Optional[str]]]] = defaultdict(dict)
    valid: Dict[str, set] = defaultdict(set)
    with open(src / REFS, encoding="utf-8-sig", newline="") as fh:
        for r in csv.DictReader(fh):
            if not r["SKOR"].strip():
                continue  # baris sampah "False,False" di sumber
            c, s = r["KODE_INDIKATOR"], int(float(r["SKOR"]))
            ket, keg = clean(r["KETERANGAN"]), clean(r["KEGIATAN"])
            fix = REF_FIX.get((c, s))
            if fix:
                ket = fix[0] or ket
            # Beberapa baris sumber menyalin KETERANGAN ke KEGIATAN; itu bukan kegiatan.
            keg = None if keg in ("", "-") or keg == ket else keg
            refs[c][str(s)] = [ket, keg]
            valid[c].add(s)

    sub_of: Dict[str, str] = {}
    subs = []
    for k, dim, nm, short, nos in SUBDIM:
        members = [idx_prefix(codes, dim, n) for n in nos]
        for m in members:
            sub_of[codes[m]] = k
        subs.append({"k": k, "dim": dim, "nm": nm, "short": short, "ind": members})
    if len(sub_of) != 50:
        raise SystemExit("Pengelompokan sub-dimensi tidak mencakup 50 indikator")

    ind_meta = []
    for r in kamus:
        c = r["KODE_INDIKATOR"]
        pel = [[lab, clean(r[col])] for col, lab in PELAKSANA if clean(r[col])]
        ind_meta.append({"c": c, "nm": LABELS[c[:5]], "api": clean(r["NAMA_INDIKATOR_API"]),
                         "dim": r["DIMENSI"], "sub": sub_of[c], "pel": pel,
                         "ref": dict(sorted(refs[c].items(), key=lambda kv: -int(kv[0])))})
    ind_meta[idx[IKS31]]["fix"] = "Dipulihkan dari total IKS resmi; data API menyalin skor internet kantor desa."

    # ── skor per desa ────────────────────────────────────────────────────────
    dash = load_codes()
    nv_msg: Dict[str, str] = {}
    with open(src / VALIDASI, encoding="utf-8-sig", newline="") as fh:
        for r in csv.DictReader(fh):
            if r["STATUS_SCRAPE"] == "kosong":
                nv_msg[r["KODE_DESA"]] = r["PESAN_API"]

    by_prov: Dict[str, Dict[str, Any]] = defaultdict(lambda: {"ds": {}, "api": {}, "nv": {}})
    scores_of: Dict[str, List[Optional[int]]] = {}
    audit: Dict[str, Any] = {
        "ok": 0, "kosong": 0, "tidak_terjoin": [], "sel_kosong": {}, "iks31": {"pulih": Counter(), "api": Counter(),
                                                                          "tidak_sah": []},
        "selisih_idm_api": {"n": 0, "gt_0_01": 0, "gt_0_05": 0, "maks": 0.0},
        "cek_dimensi": {"IKS": 0, "IKE": 0, "IKL": 0, "diuji": 0},
        "kosong_per_prov": Counter(), "alasan_kosong": Counter(),
    }
    iks_cols = [c for c in codes if c.startswith("IKS")]

    with open(src / WIDE, encoding="utf-8-sig", newline="") as fh:
        for r in csv.DictReader(fh):
            k = r["KODE_DESA"].strip()
            if k not in dash:
                audit["tidak_terjoin"].append(k)
                continue
            P = by_prov[k[:2]]
            if r["STATUS_SCRAPE"] != "ok":
                audit["kosong"] += 1
                audit["kosong_per_prov"][k[:2]] += 1
                msg = nv_msg.get(k, "")
                code = next((i for i, (pat, _) in enumerate(NV_REASONS) if pat in msg), len(NV_REASONS))
                audit["alasan_kosong"][code] += 1
                P["nv"][k] = code
                continue
            audit["ok"] += 1
            sc: List[Optional[int]] = [None if r[c].strip() == "" else int(float(r[c])) for c in codes]
            miss = [c for c, v in zip(codes, sc) if v is None]

            # Pulihkan IKS31 dari total IKS resmi API.
            api_iks = num(r["API_IKS"])
            audit["iks31"]["api"][sc[idx[IKS31]]] += 1
            others = [sc[idx[c]] for c in iks_cols if c != IKS31]
            if api_iks is not None and None not in others:
                x = api_iks * 175 - sum(others)
                v = round(x)
                if abs(x - v) < 0.05 and v in valid[IKS31]:
                    sc[idx[IKS31]] = v
                    audit["iks31"]["pulih"][v] += 1
                else:
                    sc[idx[IKS31]] = None
                    audit["iks31"]["tidak_sah"].append([k, round(x, 3)])
            else:
                sc[idx[IKS31]] = None
                if IKS31 not in miss:
                    miss.append(IKS31 + " (tak bisa dipulihkan)")
            if miss:
                audit["sel_kosong"][k] = miss

            # Skor di luar referensi berarti kolom bergeser — hentikan.
            for c, v in zip(codes, sc):
                if v is not None and v not in valid[c]:
                    raise SystemExit(f"Skor tidak sah {c}={v} di desa {k}")

            # Uji ulang: jumlah skor / pembagi harus sama dengan indeks dimensi API.
            if None not in sc:
                audit["cek_dimensi"]["diuji"] += 1
                for D in DIMS:
                    tot = sum(v for c, v in zip(codes, sc) if c.startswith(D["k"]))
                    api = num(r["API_" + D["k"]])
                    if api is not None and abs(tot / D["div"] - api) <= 1.5e-4:
                        audit["cek_dimensi"][D["k"]] += 1

            P["ds"][k] = "".join("-" if v is None else str(v) for v in sc)
            scores_of[k] = sc

            api_idm, off_idm = num(r["API_IDM"]), dash[k]["idm"]
            if api_idm is not None and off_idm is not None:
                dv = abs(api_idm - off_idm)
                if dv >= 1e-4:
                    P["api"][k] = api_idm
                    a = audit["selisih_idm_api"]
                    a["n"] += 1
                    a["gt_0_01"] += dv > 0.01
                    a["gt_0_05"] += dv > 0.05
                    a["maks"] = max(a["maks"], round(dv, 4))

    if audit["tidak_terjoin"]:
        raise SystemExit(f"{len(audit['tidak_terjoin'])} kode desa sumber tidak ada di data dashboard, "
                         f"contoh: {audit['tidak_terjoin'][:5]}")

    # ── agregat ─────────────────────────────────────────────────────────────
    def agg(keys: List[str]) -> Dict[str, Any]:
        tot, cnt = [0] * 50, [0] * 50
        dist = [[0] * 6 for _ in range(50)]
        for k in keys:
            for i, v in enumerate(scores_of[k]):
                if v is not None:
                    tot[i] += v
                    cnt[i] += 1
                    dist[i][v] += 1
        return {"m": [r2(t / c) if c else None for t, c in zip(tot, cnt)], "n": len(keys), "d": dist}

    groups: Dict[str, List[str]] = defaultdict(list)
    for k in scores_of:
        groups["nas"].append(k)
        groups["p" + k[:2]].append(k)
        groups["k" + k[:4]].append(k)

    nas = agg(groups["nas"])
    prov = {g[1:]: agg(v) for g, v in sorted(groups.items()) if g[0] == "p"}
    kab = {g[1:]: agg(v) for g, v in sorted(groups.items()) if g[0] == "k"}

    meta = {
        "year": YEAR,
        "dim": DIMS,
        "sub": subs,
        "ind": ind_meta,
        "nv": [t for _, t in NV_REASONS] + ["Data indikator tidak tersedia"],
        "nas": nas,
        "prov": {k: {"m": v["m"], "n": v["n"], "d": v["d"]} for k, v in prov.items()},
        "kab": {k: {"m": v["m"], "n": v["n"]} for k, v in kab.items()},
        "src": "API rumusan IDM Kemendesa PDTT (idm.kemendesa.go.id), diambil 2026",
    }

    outdir.mkdir(parents=True, exist_ok=True)
    for old in outdir.glob("*.json"):
        old.unlink()
    write(outdir / "meta.json", meta)
    for pk in sorted(by_prov):
        P = by_prov[pk]
        write(outdir / f"{pk}.json", {"k": pk, "ds": P["ds"], "api": P["api"], "nv": P["nv"]})

    audit["iks31"]["pulih"] = dict(sorted(audit["iks31"]["pulih"].items()))
    audit["iks31"]["api"] = {str(k): v for k, v in sorted(audit["iks31"]["api"].items(), key=lambda kv: str(kv[0]))}
    audit["kosong_per_prov"] = dict(sorted(audit["kosong_per_prov"].items()))
    audit["alasan_kosong"] = {meta["nv"][k]: v for k, v in sorted(audit["alasan_kosong"].items())}
    audit["iks27_slb_skor3"] = nas["d"][idx["IKS27_SLB"]][3]
    write(outdir / "audit.json", audit, indent=1)

    cd = audit["cek_dimensi"]
    print(f"[{YEAR}] indikator: {audit['ok']:,} desa ok, {audit['kosong']:,} kosong, "
          f"{len(prov)} provinsi, {len(kab)} kab/kota -> {outdir}")
    print(f"  IKS31 dipulihkan: {audit['iks31']['pulih']} (tidak sah: {len(audit['iks31']['tidak_sah'])}); "
          f"sel kosong: {len(audit['sel_kosong'])} desa")
    print(f"  cek jumlah/pembagi vs API ({cd['diuji']:,} desa): IKS {cd['IKS']:,}  IKE {cd['IKE']:,}  IKL {cd['IKL']:,}")
    print(f"  IDM API != resmi: {audit['selisih_idm_api']}")


def idx_prefix(codes: List[str], dim: str, n: int) -> int:
    pre = f"{dim}{n:02d}_"
    for i, c in enumerate(codes):
        if c.startswith(pre):
            return i
    raise SystemExit(f"Indikator {pre}* tidak ada di kamus")


def write(path: Path, obj: Any, indent: Optional[int] = None) -> None:
    sep = (",", ":") if indent is None else (",", ": ")
    path.write_text(json.dumps(obj, separators=sep, ensure_ascii=False, indent=indent), encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Bangun data indikator turunan IDM 2024 untuk dashboard.")
    ap.add_argument("--src", type=Path, default=DEFAULT_SRC, help=f"folder hasil_2024 (default: {DEFAULT_SRC})")
    ap.add_argument("--out", type=Path, default=ROOT / "data" / "idm" / YEAR / "indikator")
    args = ap.parse_args()
    out = args.out if args.out.is_absolute() else (ROOT / args.out).resolve()
    build(args.src, out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
