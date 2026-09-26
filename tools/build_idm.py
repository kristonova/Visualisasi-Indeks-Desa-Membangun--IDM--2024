#!/usr/bin/env python3
r"""build_idm.py — Bangun data tabular dashboard dari Excel IDM per tahun.

Keluaran per tahun (default ke data\idm\<tahun>\):
    meta.json        agregat nasional, provinsi, kab/kota + histogram
    prov\<kk>.json   baris desa per kecamatan untuk satu provinsi

Kode wilayah diterjemahkan ke penomoran IDM 2024 (lihat idm_sources.py),
jadi semua tahun berbagi geometri data\geo\ yang sama.

Cara pakai (dari akar project):
    .venv\Scripts\python tools\build_idm.py                 # semua tahun
    .venv\Scripts\python tools\build_idm.py --year 2023
    .venv\Scripts\python tools\build_idm.py --out geo-out\idm
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any, Dict, List

sys.path.insert(0, str(Path(__file__).resolve().parent))
from idm_sources import ROOT, YEARS, load_rows  # noqa: E402

HIST = {"lo": 0.2, "hi": 1, "n": 24}
THR = [0.8155, 0.7073, 0.599, 0.4908]


def half_up(x: float) -> float:
    """Pembulatan 4 desimal setengah-ke-atas, sama dengan Math.round(x*1e4)/1e4.

    Bilangan bulat dikembalikan sebagai int supaya JSON-nya "1", bukan "1.0".
    """
    v = math.floor(x * 1e4 + 0.5) / 1e4
    return int(v) if v.is_integer() else v


def mean(values: List[float]):
    # Dijumlah berurutan (bukan fsum) supaya hasilnya identik dengan data lama.
    total = 0.0
    for v in values:
        total += v
    return half_up(total / len(values)) if values else None


def aggregate(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    """n, m, s, e, l, d — rerata hanya dari desa yang punya skor."""
    scored = [r for r in rows if r["idm"] is not None]
    d = [0, 0, 0, 0, 0]
    for r in rows:
        if 1 <= r["status"] <= 5:
            d[r["status"] - 1] += 1
    return {
        "n": len(rows),
        "m": mean([r["idm"] for r in scored]),
        "s": mean([r["iks"] for r in scored if r["iks"] is not None]),
        "e": mean([r["ike"] for r in scored if r["ike"] is not None]),
        "l": mean([r["ikl"] for r in scored if r["ikl"] is not None]),
        "d": d,
    }


def histogram(rows: List[Dict[str, Any]]) -> List[int]:
    lo, n = HIST["lo"], HIST["n"]
    width = (HIST["hi"] - lo) / n
    h = [0] * n
    for r in rows:
        if r["idm"] is not None:
            h[min(n - 1, max(0, int((r["idm"] - lo) / width)))] += 1
    return h


def first_name(rows: List[Dict[str, Any]], key: str) -> str:
    return next((r[key] for r in rows if r[key]), "")


def build_year(year: str, outdir: Path) -> None:
    records, invalid = load_rows(year)
    if invalid:
        raise SystemExit(f"[{year}] {len(invalid)} baris dengan kode tidak sah, contoh: {invalid[:3]}")
    seen = set()
    for r in records:
        if r["code"] in seen:
            raise SystemExit(f"[{year}] kode desa ganda: {r['code']}")
        seen.add(r["code"])

    # Nilai desa dibulatkan 4 desimal lebih dulu; semua rerata dihitung dari
    # nilai bulat ini, dijumlah dalam urutan tampil (kec lalu nama desa).
    for r in records:
        for key in ("idm", "iks", "ike", "ikl"):
            if r[key] is not None:
                r[key] = round(r[key], 4)

    by_prov: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    for r in records:
        by_prov[r["province_code"]].append(r)

    (outdir / "prov").mkdir(parents=True, exist_ok=True)
    meta_prov, ordered_all = [], []
    for pk in sorted(by_prov):
        by_kec: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
        for r in by_prov[pk]:
            by_kec[r["district_code"]].append(r)

        kecs = []
        for kc, krows in by_kec.items():
            krows.sort(key=lambda r: r["name"])
            kecs.append((kc[:4], first_name(krows, "district"), kc, krows))
        kecs.sort(key=lambda c: (c[0], c[1]))
        prows = [r for _, _, _, krows in kecs for r in krows]
        ordered_all.extend(prows)

        prov_name = first_name(prows, "province")
        kec_objs = [
            dict({"k": kc, "nm": nm, "kb": kb}, **aggregate(krows),
                 ds=[[r["code"][6:], r["name"], r["idm"], r["iks"], r["ike"], r["ikl"], r["status"], r["source"]]
                     for r in krows])
            for kb, nm, kc, krows in kecs
        ]
        write(outdir / "prov" / f"{pk}.json", dict({"k": pk, "nm": prov_name}, **aggregate(prows), kec=kec_objs))

        by_kab: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
        for r in prows:
            by_kab[r["regency_code"]].append(r)
        kabs = [dict({"k": kb, "nm": first_name(by_kab[kb], "regency")}, **aggregate(by_kab[kb]),
                     h=histogram(by_kab[kb]))
                for kb in sorted(by_kab)]
        meta_prov.append(dict({"k": pk, "nm": prov_name}, **aggregate(prows), kab=kabs, h=histogram(prows)))

    meta = {
        "prov": meta_prov,
        "nas": dict(aggregate(ordered_all), h=histogram(ordered_all)),
        "hist": HIST,
        "thr": THR,
    }
    write(outdir / "meta.json", meta)
    nas = meta["nas"]
    moved = sum(1 for r in records if r["code"] != r["code_source"])
    print(f"[{year}] {nas['n']:,} desa, {len(meta_prov)} provinsi, rerata {nas['m']}, status {nas['d']}"
          + (f", {moved:,} kode diterjemahkan ke penomoran 2024" if moved else "")
          + f"  -> {outdir}")


def write(path: Path, obj: Any) -> None:
    path.write_text(json.dumps(obj, separators=(",", ":"), ensure_ascii=False), encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Bangun data IDM dashboard dari Excel.")
    ap.add_argument("--year", nargs="*", default=sorted(YEARS), choices=sorted(YEARS))
    ap.add_argument("--out", type=Path, default=ROOT / "data" / "idm",
                    help="folder induk; hasil ke <out>/<tahun>/ (default: data/idm)")
    args = ap.parse_args()
    out = args.out if args.out.is_absolute() else (ROOT / args.out).resolve()
    for year in args.year:
        build_year(year, out / year)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
