#!/usr/bin/env python3
# -*- coding: utf-8 -*-
r"""
build_geo.py — Bangun geometri terkuantisasi untuk Dashboard IDM 2024.

Sumber: RBI10K_ADMINISTRASI_DESA_20230928.gdb (Esri File Geodatabase, BIG, Sep-2023).
Dipilih karena kode desanya cocok 99,55% dengan IDM 2024 setelah remap Papua —
bandingkan shapefile Des-2022 (Kel_Desa.shp / Batas_Wilayah_KelurahanDesa_10K_AR.shp)
yang hanya 93,77%. Versi lama skrip ini ada di build_geo_shp_legacy.py.

Level kecamatan dan kab/kota TIDAK diambil dari berkas terpisah, melainkan
di-dissolve dari poligon desa. Dua alasan:
  1. Geometrinya jadi nested sempurna — tidak ada celah/tumpang-tindih antar level.
  2. RBI50K_ADMINISTRASI_KABKOTA memakai penomoran Papua Barat Daya yang BERBEDA
     dari IDM 2024 (di sana 96.04 = Tambrauw, di IDM 96.04 = Sorong Selatan).
     Join kode langsung akan menaruh poligon di kabupaten yang salah.

Kebutuhan: pyogrio + shapely (lihat .venv di akar project).

Cara pakai (Windows, dari akar project):
    .venv\Scripts\python tools\build_geo.py
    .venv\Scripts\python tools\build_geo.py --level desa
    .venv\Scripts\python tools\build_geo.py --prov 34 33
    .venv\Scripts\python tools\build_geo.py --tol 0.0005
    .venv\Scripts\python tools\build_geo.py --target-kb 1500
    .venv\Scripts\python tools\build_geo.py --out geo-out

Hasil default langsung ke data\geo\ (desa\, kec\, kab\ + manifest.json),
jadi dashboard tinggal di-reload. Berkas data\geo\prov.json tidak disentuh.
"""

import argparse, json, os, re, sys, time

try:
    import numpy as np
    import shapely
    from shapely.geometry.polygon import orient
    from pyogrio.raw import read as ogr_read
    from pyogrio import list_layers
except ImportError as e:
    sys.exit(
        "Pustaka belum terpasang: %s\n"
        "Jalankan dari akar project:\n"
        "    python -m venv .venv\n"
        "    .venv\\Scripts\\python -m pip install pyogrio shapely\n"
        "lalu pakai .venv\\Scripts\\python untuk menjalankan skrip ini." % e
    )

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEFAULT_SRC = os.path.join(
    "SHP GIS", "RBI10K_ADMINISTRASI_DESA_20230928.gdb")

# ── Remap kode kab/kota Papua: kode di sumber (2023) -> kode di IDM 2024 ─────
# Diturunkan dengan mencocokkan NAMA kab/kota antara sumber dan IDM 2024,
# lalu diperiksa satu per satu. Kota (91.71 Jayapura, 92.71 Sorong) sengaja
# TIDAK diremap — keduanya sudah benar dan penamaannya bentrok dengan
# kabupaten senama.
#
# Catatan: tabel di SHP GIS\REFERENSI-DATASET-GIS-BATAS-ADMINISTRASI.md §9.3
# keliru untuk dua baris terakhir (di sana Tambrauw->96.04, Maybrat->96.05).
# Yang dipakai IDM 2024 adalah 96.09 dan 96.10.
REMAP_KAB = {
    "9104": "9401",  # Nabire          -> Papua Tengah
    "9108": "9403",  # Paniai          -> Papua Tengah
    "9128": "9408",  # Deiyai          -> Papua Tengah
    "9201": "9601",  # Sorong          -> Papua Barat Daya
    "9204": "9604",  # Sorong Selatan  -> Papua Barat Daya
    "9205": "9605",  # Raja Ampat      -> Papua Barat Daya
    "9209": "9609",  # Tambrauw        -> Papua Barat Daya
    "9210": "9610",  # Maybrat         -> Papua Barat Daya
}

# Kolom kode desa dan nama, sesuai skema sumber yang mungkin dipakai.
CODE_FIELDS = ["KDEPUM", "KODE_KD"]
NAME_FIELDS = {
    "desa": ["WADMKD", "KEL_DESA", "NAMOBJ", "NAME"],
    "kec":  ["WADMKC", "KECAMATAN"],
    "kab":  ["WADMKK", "KAB_KOTA"],
}

QUANT = 100000            # 1e-5 derajat ~ 1,1 meter
GRID = 1.0 / QUANT        # grid snapping saat dissolve, sepadan dengan QUANT

LEVELS = {
    #        panjang kode, toleransi awal (derajat), luas cincin min, target KB, kuantisasi
    "desa": dict(digits=10, tol=0.00035, minarea=1.2e-7, target=2200, quant=QUANT),
    "kec":  dict(digits=6,  tol=0.00110, minarea=8.0e-7, target=900,  quant=QUANT),
    "kab":  dict(digits=4,  tol=0.00220, minarea=3.0e-6, target=500,  quant=QUANT),
    # prov dibangun terpisah dari kab/*.json, bukan per provinsi. Kuantisasinya
    # lebih kasar (1e-4 derajat ~ 11 m) supaya angka delta-nya pendek: untuk peta
    # nasional presisi segitu lebih dari cukup dan berkasnya jauh lebih kecil.
    # tol 0.008 derajat ~ 0,25 px pada zoom nasional (46 bujur di ~1500 px),
    # jadi lebih halus dari ini tidak terlihat mata tapi memberatkan muat awal.
    "prov": dict(digits=2,  tol=0.00800, minarea=1.0e-5, target=400,  quant=10000),
}
ORDER = ["desa", "kec", "kab"]        # level yang dibangun per provinsi
ALL_LEVELS = ORDER + ["prov"]

NAMA_PROV = {
    "11": "ACEH", "12": "SUMATERA UTARA", "13": "SUMATERA BARAT", "14": "RIAU",
    "15": "JAMBI", "16": "SUMATERA SELATAN", "17": "BENGKULU", "18": "LAMPUNG",
    "19": "KEPULAUAN BANGKA BELITUNG", "21": "KEPULAUAN RIAU", "31": "DKI JAKARTA",
    "32": "JAWA BARAT", "33": "JAWA TENGAH", "34": "DI YOGYAKARTA", "35": "JAWA TIMUR",
    "36": "BANTEN", "51": "BALI", "52": "NUSA TENGGARA BARAT", "53": "NUSA TENGGARA TIMUR",
    "61": "KALIMANTAN BARAT", "62": "KALIMANTAN TENGAH", "63": "KALIMANTAN SELATAN",
    "64": "KALIMANTAN TIMUR", "65": "KALIMANTAN UTARA", "71": "SULAWESI UTARA",
    "72": "SULAWESI TENGAH", "73": "SULAWESI SELATAN", "74": "SULAWESI TENGGARA",
    "75": "GORONTALO", "76": "SULAWESI BARAT", "81": "MALUKU", "82": "MALUKU UTARA",
    "91": "PAPUA", "92": "PAPUA BARAT", "93": "PAPUA SELATAN", "94": "PAPUA TENGAH",
    "95": "PAPUA PEGUNUNGAN", "96": "PAPUA BARAT DAYA",
}


def digits(s):
    return re.sub(r"\D", "", "" if s is None else str(s))


def remap(code):
    """Kode desa 10 digit sumber -> kode IDM 2024."""
    return REMAP_KAB.get(code[:4], code[:4]) + code[4:] if len(code) == 10 else code


def fmt(n):
    return "{:,}".format(n).replace(",", ".")


def hhmmss(sec):
    return time.strftime("%M:%S", time.gmtime(sec))


# ═══════════════════════════════════════════════════════════════ SUMBER ═════
def resolve(path):
    """Terima path absolut, relatif ke CWD, atau relatif ke akar project."""
    for cand in (path, os.path.join(ROOT, path)):
        if os.path.exists(cand):
            return os.path.abspath(cand)
    return None


def pick_layer(src, want):
    """Layer poligon desa di dalam sumber. .shp hanya punya satu layer."""
    if want:
        return want
    layers = [str(r[0]) for r in list_layers(src)]
    if len(layers) == 1:
        return layers[0]
    for L in layers:
        if "DESA" in L.upper():
            return L
    raise SystemExit("Tidak bisa menentukan layer. Tersedia: %s" % ", ".join(layers))


def pick_fields(src, layer):
    """Cari nama kolom kode + nama yang benar-benar ada di sumber."""
    meta, _, _, _ = ogr_read(src, layer=layer, read_geometry=False, max_features=0)
    have = {str(f).upper(): str(f) for f in meta["fields"]}

    code = next((have[c] for c in CODE_FIELDS if c in have), None)
    if not code:
        raise SystemExit(
            "Tidak menemukan kolom kode desa (%s) di %s.\nKolom tersedia: %s"
            % (" / ".join(CODE_FIELDS), os.path.basename(src), ", ".join(have.values()))
        )
    names = {}
    for lvl, cands in NAME_FIELDS.items():
        names[lvl] = next((have[c] for c in cands if c in have), None)
    return code, names


# ═════════════════════════════════════════════════════════════ GEOMETRI ═════
def collect_polygons(geom, out):
    """Ratakan Polygon / MultiPolygon / GeometryCollection jadi daftar Polygon."""
    if geom is None or geom.is_empty:
        return
    t = geom.geom_type
    if t == "Polygon":
        out.append(geom)
    elif t in ("MultiPolygon", "GeometryCollection"):
        for g in geom.geoms:
            collect_polygons(g, out)


def to_rings(geom):
    """Polygon shapely -> daftar cincin [(x, y), ...].

    Cincin luar diorientasikan CCW dan lubang CW supaya canvas ctx.fill()
    (aturan nonzero, lihat decode() di Dashboard IDM 2024.dc.html) merender
    lubang/enclave sebagai lubang, bukan blok penuh.
    """
    polys = []
    collect_polygons(geom, polys)
    rings = []
    for p in polys:
        try:
            p = orient(p, sign=1.0)
        except Exception:
            pass
        rings.append(list(p.exterior.coords))
        for hole in p.interiors:
            rings.append(list(hole.coords))
    return rings


def ring_area(pts):
    s = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return abs(s) * 0.5


def make_valid(geoms):
    """Perbaiki poligon rusak — RBI punya sejumlah self-intersection."""
    arr = np.asarray(geoms, dtype=object)
    bad = ~shapely.is_valid(arr)
    if bad.any():
        arr[bad] = shapely.make_valid(arr[bad])
    return arr


def dissolve(codes, geoms, width, names):
    """Gabung poligon anak jadi poligon induk berdasarkan awalan kode.

    grid_size menyamakan simpul di batas bersama sebelum union, sehingga
    sisa-sisa sliver hilang dan union-nya jauh lebih cepat.
    """
    groups, label = {}, {}
    for code, geom, nm in zip(codes, geoms, names):
        key = code[:width]
        groups.setdefault(key, []).append(geom)
        if nm and key not in label:
            label[key] = nm
    out_codes, out_geoms, out_names = [], [], []
    for key in sorted(groups):
        part = groups[key]
        if len(part) == 1:
            merged = part[0]
        else:
            try:
                merged = shapely.union_all(part, grid_size=GRID)
            except Exception:
                # grid_size kadang gagal pada geometri ekstrem; ulangi tanpa snap
                try:
                    merged = shapely.union_all(shapely.make_valid(np.asarray(part, dtype=object)))
                except Exception:
                    continue
        if merged is None or merged.is_empty:
            continue
        out_codes.append(key)
        out_geoms.append(merged)
        out_names.append(label.get(key, ""))
    return out_codes, out_geoms, out_names


# ═════════════════════════════════════════════════════════════ ENCODE ═══════
def encode(level, codes, geoms, names, tol, minarea, quant=QUANT):
    """Sederhanakan, kuantisasi, dan delta-encode — format yang dibaca decode()."""
    simplified = shapely.simplify(np.asarray(geoms, dtype=object), tol)

    prepared = []
    minx = miny = 1e18
    for code, name, simp, raw in zip(codes, names, simplified, geoms):
        keep = [r for r in to_rings(simp) if len(r) >= 4 and ring_area(r) >= minarea]
        if not keep:
            # jangan buang fitur: coba toleransi jauh lebih halus, lalu apa adanya
            for fallback in (shapely.simplify(raw, tol * 0.35), raw):
                cand = [r for r in to_rings(fallback) if len(r) >= 4]
                if cand:
                    keep = [max(cand, key=ring_area)]
                    break
        if not keep:
            continue
        for r in keep:
            for x, y in r:
                if x < minx:
                    minx = x
                if y < miny:
                    miny = y
        prepared.append((code, name, keep))

    if not prepared:
        return None

    out = []
    for code, name, keep in prepared:
        g = []
        for r in keep:
            arr = []
            px = py = 0
            for x, y in r:
                X = int(round((x - minx) * quant))
                Y = int(round((y - miny) * quant))
                if arr and X == px and Y == py:
                    continue
                arr.append(X - px)
                arr.append(Y - py)
                px, py = X, Y
            if len(arr) >= 8:
                g.append(arr)
        if g:
            out.append({"k": code, "nm": name, "g": g})
    if not out:
        return None
    return {"lvl": level, "bbox": [round(minx, 6), round(miny, 6)], "q": quant, "f": out}


def write_level(outdir, level, prov, codes, geoms, names, args):
    cfg = LEVELS[level]
    target = (args.target_kb or cfg["target"]) * 1024
    tol = args.tol if args.tol is not None else cfg["tol"]
    blob = None
    for _ in range(7):
        obj = encode(level, codes, geoms, names, tol, cfg["minarea"], cfg["quant"])
        if obj is None:
            return False
        blob = json.dumps(obj, separators=(",", ":"), ensure_ascii=False)
        if len(blob.encode("utf-8")) <= target:
            break
        tol *= 1.7
    if not blob:
        return False
    os.makedirs(os.path.join(outdir, level), exist_ok=True)
    with open(os.path.join(outdir, level, prov + ".json"), "w", encoding="utf-8") as fh:
        fh.write(blob)
    print("    %-4s %6s fitur  %6.0f KB  tol %.5f"
          % (level, fmt(len(codes)), len(blob.encode("utf-8")) / 1024, tol))
    return True


# ═══════════════════════════════════════════════════════════ LEVEL PROV ═════
def decode_json(path):
    """Kebalikan encode() — dipakai untuk membaca kembali kab/*.json."""
    with open(path, encoding="utf-8") as fh:
        g = json.load(fh)
    minx, miny, q = g["bbox"][0], g["bbox"][1], g["q"]
    feats = []
    for f in g["f"]:
        rings = []
        for a in f["g"]:
            px = py = 0
            pts = []
            for i in range(0, len(a), 2):
                px += a[i]
                py += a[i + 1]
                pts.append((minx + px / q, miny + py / q))
            if len(pts) >= 4:
                rings.append(pts)
        if rings:
            feats.append((str(f["k"]), f["nm"], rings))
    return feats


def signed_area(pts):
    s = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return s * 0.5


def rings_to_geom(rings):
    """Rakit ulang cincin datar jadi (Multi)Polygon.

    to_rings() menulis cincin luar (CCW, luas bertanda positif) lebih dulu, lalu
    lubang-lubangnya (CW, negatif). Douglas-Peucker tidak mengubah arah putaran,
    jadi tanda luas cukup untuk memisahkan keduanya.
    """
    polys, cur, holes = [], None, []
    for r in rings:
        if signed_area(r) >= 0:
            if cur is not None:
                polys.append((cur, holes))
            cur, holes = r, []
        elif cur is not None:
            holes.append(r)
    if cur is not None:
        polys.append((cur, holes))

    built = []
    for shell, hs in polys:
        try:
            p = shapely.Polygon(shell, hs)
            if not p.is_valid:
                p = shapely.make_valid(p)
            if not p.is_empty:
                built.append(p)
        except Exception:
            continue
    if not built:
        return None
    return built[0] if len(built) == 1 else shapely.union_all(built, grid_size=GRID)


def build_prov(outdir, args):
    """Bangun prov.json (38 provinsi) dengan menggabungkan kab/*.json.

    Sengaja dari keluaran level kab, bukan baca ulang .gdb: hasilnya persis
    nested dengan level di bawahnya dan selesai dalam hitungan detik.
    """
    kabdir = os.path.join(outdir, "kab")
    if not os.path.isdir(kabdir):
        print("[PROV] lewati — %s belum ada. Bangun level kab lebih dulu." % kabdir)
        return False

    files = sorted(f for f in os.listdir(kabdir) if f.endswith(".json"))
    if not files:
        print("[PROV] lewati — tidak ada kab/*.json.")
        return False

    print("[PROV]  gabungkan %d berkas kab" % len(files))
    t0 = time.time()
    codes, geoms, names = [], [], []
    for fn in files:
        pv = os.path.splitext(fn)[0]
        parts = []
        for _, _, rings in decode_json(os.path.join(kabdir, fn)):
            g = rings_to_geom(rings)
            if g is not None and not g.is_empty:
                parts.append(g)
        if not parts:
            continue
        try:
            merged = shapely.union_all(parts, grid_size=GRID)
        except Exception:
            merged = shapely.union_all(shapely.make_valid(np.asarray(parts, dtype=object)))
        if merged is None or merged.is_empty:
            continue
        codes.append(pv)
        geoms.append(merged)
        names.append(NAMA_PROV.get(pv, pv))

    if not codes:
        print("[PROV] gagal — tidak ada geometri yang terbentuk.")
        return False

    cfg = LEVELS["prov"]
    target = (args.target_kb or cfg["target"]) * 1024
    tol = args.tol if args.tol is not None else cfg["tol"]
    blob = None
    for _ in range(7):
        obj = encode("prov", codes, geoms, names, tol, cfg["minarea"], cfg["quant"])
        if obj is None:
            return False
        blob = json.dumps(obj, separators=(",", ":"), ensure_ascii=False)
        if len(blob.encode("utf-8")) <= target:
            break
        tol *= 1.6

    path = os.path.join(outdir, "prov.json")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(blob)
    print("    prov %6d provinsi  %6.0f KB  tol %.5f  q %d  (%s)"
          % (len(codes), len(blob.encode("utf-8")) / 1024, tol, cfg["quant"], hhmmss(time.time() - t0)))
    print("    kode: %s" % " ".join(codes))
    return True


# ══════════════════════════════════════════════════════════════ MAIN ════════
def main():
    ap = argparse.ArgumentParser(
        description="Bangun geometri IDM 2024 dari File Geodatabase / Shapefile.")
    ap.add_argument("--src", default=DEFAULT_SRC,
                    help="berkas .gdb atau .shp desa (default: RBI10K ...DESA_20230928.gdb)")
    ap.add_argument("--layer", default=None, help="nama layer di dalam .gdb")
    ap.add_argument("--out", default=os.path.join("data", "geo"),
                    help="folder keluaran (default: data/geo)")
    ap.add_argument("--level", nargs="*", default=ALL_LEVELS, choices=ALL_LEVELS,
                    help="prov dibangun dari kab/*.json, jadi bisa dijalankan sendiri")
    ap.add_argument("--prov", nargs="*", default=[], help="batasi ke kode provinsi tertentu")
    ap.add_argument("--tol", type=float, default=None)
    ap.add_argument("--target-kb", type=int, default=None)
    ap.add_argument("--no-remap", action="store_true",
                    help="jangan remap kode Papua (untuk membandingkan saja)")
    args = ap.parse_args()

    # progres harus terlihat saat keluaran dialihkan ke berkas/pipe
    try:
        sys.stdout.reconfigure(line_buffering=True)
    except Exception:
        pass

    outdir = args.out if os.path.isabs(args.out) else os.path.join(ROOT, args.out)
    levels = [L for L in ORDER if L in args.level]
    want_prov = "prov" in args.level
    only = set(args.prov)

    # prov murni turunan kab/*.json — kalau cuma itu yang diminta, .gdb tidak perlu dibuka
    if want_prov and not levels:
        print("Keluar : %s" % outdir)
        print()
        build_prov(outdir, args)
        return

    src = resolve(args.src)
    if not src:
        raise SystemExit("Sumber tidak ditemukan: %s" % args.src)

    layer = pick_layer(src, args.layer)
    code_f, name_f = pick_fields(src, layer)

    print("Sumber : %s" % src)
    print("Layer  : %s" % layer)
    print("Kolom  : kode=%s  nama=%s" % (code_f, name_f["desa"]))
    print("Keluar : %s" % outdir)
    print("Level  : %s%s" % (", ".join(levels), "" if not only else "   provinsi: " + " ".join(sorted(only))))
    print()

    # ── Pass 1: baca atribut saja, tentukan fitur mana milik provinsi mana ───
    t0 = time.time()
    cols = [code_f] + [f for f in dict.fromkeys(name_f.values()) if f]
    meta, fids, _, fields = ogr_read(src, layer=layer, columns=cols,
                                     read_geometry=False, return_fids=True)
    order = {str(f): i for i, f in enumerate(meta["fields"])}
    col = lambda f: fields[order[f]] if f and f in order else None

    src_code = col(code_f)
    nm_desa, nm_kec, nm_kab = col(name_f["desa"]), col(name_f["kec"]), col(name_f["kab"])

    plan, skipped, remapped = {}, 0, 0
    for i, raw in enumerate(src_code):
        c = digits(raw)
        if len(c) != 10:
            skipped += 1
            continue
        k = c if args.no_remap else remap(c)
        if k != c:
            remapped += 1
        pv = k[:2]
        if only and pv not in only:
            continue
        plan.setdefault(pv, []).append((int(fids[i]), i, k))

    print("Pindai atribut: %s fitur, %s kode sah, %s provinsi  (%s)"
          % (fmt(len(src_code)), fmt(len(src_code) - skipped), fmt(len(plan)), hhmmss(time.time() - t0)))
    if skipped:
        print("  %s baris tanpa kode desa 10 digit — dilewati" % fmt(skipped))
    if remapped:
        print("  %s baris kode Papua diremap ke penomoran IDM 2024" % fmt(remapped))
    print()

    # ── manifest ────────────────────────────────────────────────────────────
    os.makedirs(outdir, exist_ok=True)
    mpath = os.path.join(outdir, "manifest.json")
    manifest = {"prov": True, "kab": [], "kec": [], "desa": []}
    if os.path.exists(mpath):
        try:
            with open(mpath, encoding="utf-8") as fh:
                manifest.update(json.load(fh))
        except Exception:
            pass
    done = {L: set(manifest.get(L, []) or []) for L in ORDER}

    # ── Pass 2: satu provinsi pada satu waktu ───────────────────────────────
    total = time.time()
    for pv in sorted(plan):
        rows = plan[pv]
        t1 = time.time()
        print("[%s]  %s desa" % (pv, fmt(len(rows))))

        _, _, wkb, _ = ogr_read(src, layer=layer, columns=[code_f],
                                read_geometry=True, force_2d=True,
                                fids=[r[0] for r in rows])
        geoms = make_valid(shapely.from_wkb(wkb))

        codes = [r[2] for r in rows]
        idx = [r[1] for r in rows]
        nd = [str(nm_desa[i] or "").strip() if nm_desa is not None else "" for i in idx]
        nc = [str(nm_kec[i] or "").strip() if nm_kec is not None else "" for i in idx]
        nk = [str(nm_kab[i] or "").strip() if nm_kab is not None else "" for i in idx]

        if "desa" in levels and write_level(outdir, "desa", pv, codes, geoms, nd, args):
            done["desa"].add(pv)

        if "kec" in levels or "kab" in levels:
            kec_c, kec_g, kec_n = dissolve(codes, geoms, 6, nc)
            if "kec" in levels and write_level(outdir, "kec", pv, kec_c, kec_g, kec_n, args):
                done["kec"].add(pv)
            if "kab" in levels:
                # nama kab diambil dari desa, dipetakan lewat awalan 4 digit
                kab_label = {}
                for c, n in zip(codes, nk):
                    if n:
                        kab_label.setdefault(c[:4], n)
                kab_c, kab_g, _ = dissolve(kec_c, kec_g, 4, [kab_label.get(c[:4], "") for c in kec_c])
                kab_n = [kab_label.get(c, "") for c in kab_c]
                if write_level(outdir, "kab", pv, kab_c, kab_g, kab_n, args):
                    done["kab"].add(pv)

        print("    selesai dalam %s" % hhmmss(time.time() - t1))

        for L in ORDER:
            manifest[L] = sorted(done[L])
        with open(mpath, "w", encoding="utf-8") as fh:
            json.dump(manifest, fh, indent=2)

    print()
    if want_prov:
        build_prov(outdir, args)
        print()
    print("manifest.json diperbarui: desa %d prov, kec %d prov, kab %d prov"
          % (len(done["desa"]), len(done["kec"]), len(done["kab"])))
    print("Total waktu %s. Reload dashboard untuk melihat hasilnya." % hhmmss(time.time() - total))


if __name__ == "__main__":
    main()
