#!/usr/bin/env python3
# -*- coding: utf-8 -*-
r"""
build_geo.py — Bangun geometri terkuantisasi untuk Dashboard IDM 2024.

TANPA DEPENDENSI. Hanya pustaka standar Python 3.8+.
Tidak perlu GDAL, geopandas, shapely, atau mapshaper.

Cara pakai (Windows):
    1. Simpan berkas ini di:
       D:\PROJECT\Visualisasi Indeks Desa Membangun 2024 - Claude\build_geo.py
    2. Buka Command Prompt di folder itu, lalu jalankan:
       python build_geo.py
    3. Hasilnya muncul di sub-folder  geo-out\  (desa, kec, kab + manifest.json).
    4. Kabari Claude — berkasnya akan disalin ke project dan peta desa langsung aktif.

Opsi:
    python build_geo.py --level desa            hanya desa (paling penting)
    python build_geo.py --prov 34 33            hanya provinsi tertentu
    python build_geo.py --tol 0.0005            perbesar toleransi = berkas lebih kecil
    python build_geo.py --target-kb 1500        target ukuran maksimum per provinsi
    python build_geo.py --src "SHP GIS/batas-administrasi-indonesia"
"""

import argparse, json, math, os, re, struct, sys, time

# ── Peta kode kabupaten (4 digit) -> kode provinsi (2 digit), dari IDM 2024 ──
# Dipakai supaya pemekaran Papua (91..96) tetap masuk ke provinsi yang benar,
# meski shapefile-nya masih memakai kode provinsi lama.
_RAW = {
    "11": "1101 1102 1103 1104 1105 1106 1107 1108 1109 1110 1111 1112 1113 1114 1115 1116 1117 1118 1171 1172 1173 1174 1175",
    "12": "1201 1202 1203 1204 1205 1206 1207 1208 1209 1210 1211 1212 1213 1214 1215 1216 1217 1218 1219 1220 1221 1222 1223 1224 1225 1277 1278",
    "13": "1301 1302 1303 1304 1305 1306 1307 1308 1309 1310 1311 1312 1373 1377",
    "14": "1401 1402 1403 1404 1405 1406 1407 1408 1409 1410",
    "15": "1501 1502 1503 1504 1505 1506 1507 1508 1509 1572",
    "16": "1601 1602 1603 1604 1605 1606 1607 1608 1609 1610 1611 1612 1613 1674",
    "17": "1701 1702 1703 1704 1705 1706 1707 1708 1709",
    "18": "1801 1802 1803 1804 1805 1806 1807 1808 1809 1810 1811 1812 1813",
    "19": "1901 1902 1903 1904 1905 1906",
    "21": "2101 2102 2103 2104 2105",
    "32": "3201 3202 3203 3204 3205 3206 3207 3208 3209 3210 3211 3212 3213 3214 3215 3216 3217 3218 3279",
    "33": "3301 3302 3303 3304 3305 3306 3307 3308 3309 3310 3311 3312 3313 3314 3315 3316 3317 3318 3319 3320 3321 3322 3323 3324 3325 3326 3327 3328 3329",
    "34": "3401 3402 3403 3404",
    "35": "3501 3502 3503 3504 3505 3506 3507 3508 3509 3510 3511 3512 3513 3514 3515 3516 3517 3518 3519 3520 3521 3522 3523 3524 3525 3526 3527 3528 3529 3579",
    "36": "3601 3602 3603 3604",
    "51": "5101 5102 5103 5104 5105 5106 5107 5108 5171",
    "52": "5201 5202 5203 5204 5205 5206 5207 5208",
    "53": "5301 5302 5303 5304 5305 5306 5307 5308 5309 5310 5311 5312 5313 5314 5315 5316 5317 5318 5319 5320 5321",
    "61": "6101 6102 6103 6104 6105 6106 6107 6108 6109 6110 6111 6112",
    "62": "6201 6202 6203 6204 6205 6206 6207 6208 6209 6210 6211 6212 6213",
    "63": "6301 6302 6303 6304 6305 6306 6307 6308 6309 6310 6311",
    "64": "6401 6402 6403 6407 6408 6409 6411",
    "65": "6501 6502 6503 6504",
    "71": "7101 7102 7103 7104 7105 7106 7107 7108 7109 7110 7111 7174",
    "72": "7201 7202 7203 7204 7205 7206 7207 7208 7209 7210 7211 7212",
    "73": "7301 7302 7303 7304 7305 7306 7307 7308 7309 7310 7311 7312 7313 7314 7315 7316 7317 7318 7322 7324 7326",
    "74": "7401 7402 7403 7404 7405 7406 7407 7408 7409 7410 7411 7412 7413 7414 7415",
    "75": "7501 7502 7503 7504 7505",
    "76": "7601 7602 7603 7604 7605 7606",
    "81": "8101 8102 8103 8104 8105 8106 8107 8108 8109 8171 8172",
    "82": "8201 8202 8203 8204 8205 8206 8207 8208 8272",
    "91": "9103 9105 9106 9110 9111 9115 9119 9120 9171",
    "92": "9202 9203 9206 9207 9208 9211 9212",
    "93": "9301 9302 9303 9304",
    "94": "9401 9402 9403 9404 9405 9406 9407 9408",
    "95": "9501 9502 9503 9504 9505 9506 9507 9508",
    "96": "9601 9604 9605 9609 9610",
}
KAB2PROV = {}
for _p, _ks in _RAW.items():
    for _k in _ks.split():
        KAB2PROV[_k] = _p

LEVELS = {
    # nama folder sumber, tol default (derajat), luas cincin minimum, target KB
    "desa": dict(dirname="Kel_Desa",  tol=0.00035, minarea=1.2e-7, target=2200),
    "kec":  dict(dirname="Kecamatan", tol=0.00110, minarea=8.0e-7, target=900),
    "kab":  dict(dirname="Kab_Kota",  tol=0.00220, minarea=3.0e-6, target=500),
}
QUANT = 100000  # 1e-5 derajat ~ 1,1 meter


# ══════════════════════════════════════════════════════════════════ DBF ═════
class Dbf:
    def __init__(self, path):
        self.f = open(path, "rb")
        head = self.f.read(32)
        self.n = struct.unpack("<I", head[4:8])[0]
        self.hlen = struct.unpack("<H", head[8:10])[0]
        self.rlen = struct.unpack("<H", head[10:12])[0]
        self.fields = []
        off = 1
        while True:
            d = self.f.read(32)
            if not d or d[0] == 0x0D:
                break
            name = d[0:11].split(b"\x00")[0].decode("latin-1").strip()
            size = d[16]
            self.fields.append((name, off, size))
            off += size
        enc = "utf-8"
        cpg = os.path.splitext(path)[0] + ".cpg"
        if os.path.exists(cpg):
            try:
                t = open(cpg).read().strip().lower()
                if "utf" in t:
                    enc = "utf-8"
                elif t:
                    enc = "cp1252"
            except Exception:
                pass
        self.enc = enc
        self.index = {name: (o, s) for name, o, s in self.fields}

    def row(self, i):
        self.f.seek(self.hlen + i * self.rlen)
        raw = self.f.read(self.rlen)
        out = {}
        for name, o, s in self.fields:
            v = raw[o:o + s]
            try:
                out[name] = v.decode(self.enc).strip()
            except UnicodeDecodeError:
                out[name] = v.decode("latin-1").strip()
        return out

    def close(self):
        self.f.close()


# ══════════════════════════════════════════════════════════════════ SHP ═════
class Shp:
    """Baca .shp per-record lewat indeks .shx — tidak pernah memuat berkas penuh."""

    def __init__(self, path):
        self.f = open(path, "rb")
        shx = os.path.splitext(path)[0] + ".shx"
        with open(shx, "rb") as x:
            x.seek(0, os.SEEK_END)
            self.n = (x.tell() - 100) // 8
            x.seek(100)
            self.idx = x.read(self.n * 8)

    def rings(self, i):
        off, ln = struct.unpack(">ii", self.idx[i * 8:i * 8 + 8])
        self.f.seek(off * 2 + 8)
        buf = self.f.read(ln * 2)
        if len(buf) < 44:
            return []
        st = struct.unpack("<i", buf[0:4])[0]
        if st not in (5, 15, 25):
            return []
        nparts, npts = struct.unpack("<ii", buf[36:44])
        p0 = 44
        parts = struct.unpack("<%di" % nparts, buf[p0:p0 + 4 * nparts])
        p1 = p0 + 4 * nparts
        need = p1 + 16 * npts
        if len(buf) < need:
            return []
        xy = struct.unpack("<%dd" % (npts * 2), buf[p1:need])
        out = []
        for k in range(nparts):
            a = parts[k]
            b = parts[k + 1] if k + 1 < nparts else npts
            if b - a < 4:
                continue
            out.append([(xy[j * 2], xy[j * 2 + 1]) for j in range(a, b)])
        return out

    def close(self):
        self.f.close()


# ═══════════════════════════════════════════════════════════ GEOMETRI ═══════
def simplify(pts, tol):
    """Douglas-Peucker iteratif (tanpa rekursi) supaya aman untuk cincin besar."""
    n = len(pts)
    if n < 5 or tol <= 0:
        return pts
    keep = [False] * n
    keep[0] = keep[n - 1] = True
    stack = [(0, n - 1)]
    t2 = tol * tol
    while stack:
        a, b = stack.pop()
        if b - a < 2:
            continue
        ax, ay = pts[a]
        bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        den = dx * dx + dy * dy
        best, bi = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            if den <= 0:
                d2 = (px - ax) ** 2 + (py - ay) ** 2
            else:
                t = ((px - ax) * dx + (py - ay) * dy) / den
                t = 0.0 if t < 0 else (1.0 if t > 1 else t)
                d2 = (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2
            if d2 > best:
                best, bi = d2, i
        if best > t2:
            keep[bi] = True
            stack.append((a, bi))
            stack.append((bi, b))
    return [pts[i] for i in range(n) if keep[i]]


def ring_area(pts):
    s = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return abs(s) * 0.5


# ═════════════════════════════════════════════════════════════ FIELDS ═══════
DOTCODE = re.compile(r"^[\d.]{4,20}$")


def digits(s):
    return re.sub(r"\D", "", s or "")


def pick_fields(dbf, want_len, code_field=None, name_field=None):
    sample = [dbf.row(i) for i in range(0, min(dbf.n, 40))]
    names = [f[0] for f in dbf.fields]

    if not code_field:
        scored = []
        for nm in names:
            hit = 0
            for r in sample:
                v = r.get(nm, "")
                if DOTCODE.match(v) and len(digits(v)) == want_len:
                    hit += 1
            if hit:
                bonus = 2 if "KODE" in nm.upper() or "ID" in nm.upper() else 0
                scored.append((hit + bonus, nm))
        if not scored:
            raise SystemExit(
                "Tidak menemukan kolom kode %d digit di %s. Kolom tersedia: %s"
                % (want_len, os.path.basename(dbf.f.name), ", ".join(names))
            )
        scored.sort(reverse=True)
        code_field = scored[0][1]

    if not name_field:
        best, bn = -1, names[0]
        for nm in names:
            if nm == code_field:
                continue
            sc = 0
            for r in sample:
                v = r.get(nm, "")
                if v and not DOTCODE.match(v):
                    sc += len(v)
            if sc > best:
                best, bn = sc, nm
        name_field = bn
    return code_field, name_field


# ══════════════════════════════════════════════════════════════ BUILD ═══════
def prov_of(code):
    return KAB2PROV.get(code[:4], code[:2])


def scan_level(src, level, only, args):
    """Pass 1 — baca DBF saja. Hanya indeks + kode + nama yang disimpan di memori."""
    cfg = LEVELS[level]
    base = os.path.join(src, cfg["dirname"], cfg["dirname"])
    shp_path = base + ".shp"
    if not os.path.exists(shp_path):
        print("  ! lewati %-4s — tidak ada %s" % (level, shp_path))
        return None
    want = {"desa": 10, "kec": 6, "kab": 4}[level]

    dbf = Dbf(base + ".dbf")
    shp = Shp(shp_path)
    cf, nf = pick_fields(dbf, want, args.code_field, args.name_field)
    print("  kolom: kode=%s  nama=%s  (%s fitur)" % (cf, nf, "{:,}".format(shp.n).replace(",", ".")))

    index = {}
    t0 = time.time()
    step = max(1, shp.n // 40)
    for i in range(shp.n):
        if i % step == 0:
            sys.stdout.write("\r  pindai %3d%%" % (i * 100 // max(1, shp.n)))
            sys.stdout.flush()
        row = dbf.row(i)
        code = digits(row.get(cf, ""))
        if len(code) != want:
            continue
        pv = prov_of(code)
        if only and pv not in only:
            continue
        index.setdefault(pv, []).append((i, code, row.get(nf, "").strip()))
    sys.stdout.write("\r  pindai 100%%  (%s)\n" % time.strftime("%M:%S", time.gmtime(time.time() - t0)))
    dbf.close()
    return shp, index


def encode(level, feats, tol, minarea):
    minx = miny = 1e18
    prepared = []
    for code, name, rings in feats:
        keep = []
        for r in rings:
            if len(r) > 4:
                r = simplify(r, tol)
            if len(r) < 4 or ring_area(r) < minarea:
                continue
            keep.append(r)
        if not keep:
            # jangan buang fitur: pertahankan cincin terbesar apa adanya
            big = max(rings, key=ring_area)
            if len(big) >= 4:
                keep = [simplify(big, tol * 0.35)]
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
                X = int(round((x - minx) * QUANT))
                Y = int(round((y - miny) * QUANT))
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
    return {"lvl": level, "bbox": [round(minx, 6), round(miny, 6)], "q": QUANT, "f": out}


def main():
    ap = argparse.ArgumentParser(description="Bangun geometri IDM 2024 (tanpa dependensi).")
    ap.add_argument("--src", default="SHP GIS/batas-administrasi-indonesia")
    ap.add_argument("--out", default="geo-out")
    ap.add_argument("--level", nargs="*", default=["desa", "kec", "kab"], choices=["desa", "kec", "kab"])
    ap.add_argument("--prov", nargs="*", default=[])
    ap.add_argument("--tol", type=float, default=None)
    ap.add_argument("--target-kb", type=int, default=None)
    ap.add_argument("--code-field", default=None)
    ap.add_argument("--name-field", default=None)
    args = ap.parse_args()

    src = args.src
    if not os.path.isdir(src):
        alt = os.path.join(os.path.dirname(os.path.abspath(__file__)), src)
        if os.path.isdir(alt):
            src = alt
        else:
            raise SystemExit("Folder sumber tidak ditemukan: %s" % args.src)

    only = set(args.prov)
    os.makedirs(args.out, exist_ok=True)
    manifest = {"prov": True, "kab": [], "kec": [], "desa": []}
    mpath = os.path.join(args.out, "manifest.json")
    if os.path.exists(mpath):
        try:
            manifest.update(json.load(open(mpath)))
        except Exception:
            pass

    print("Sumber : %s" % os.path.abspath(src))
    print("Keluar : %s" % os.path.abspath(args.out))
    print()

    for level in args.level:
        cfg = LEVELS[level]
        print("[%s]" % level.upper())
        scanned = scan_level(src, level, only, args)
        if not scanned:
            print()
            continue
        shp, index = scanned
        outdir = os.path.join(args.out, level)
        os.makedirs(outdir, exist_ok=True)
        target = (args.target_kb or cfg["target"]) * 1024
        done = set(manifest.get(level, []))
        # Pass 2 — satu provinsi pada satu waktu: baca geometri, tulis, lepas memori.
        for pv in sorted(index):
            entries = index[pv]
            feats = []
            for i, code, name in entries:
                rings = shp.rings(i)
                if rings:
                    feats.append((code, name, rings))
            if not feats:
                continue
            tol = args.tol if args.tol is not None else cfg["tol"]
            blob = None
            for _ in range(7):
                obj = encode(level, feats, tol, cfg["minarea"])
                if obj is None:
                    break
                blob = json.dumps(obj, separators=(",", ":"), ensure_ascii=False)
                if len(blob.encode("utf-8")) <= target:
                    break
                tol *= 1.7
            nfeat = len(feats)
            feats = None
            if not blob:
                continue
            with open(os.path.join(outdir, pv + ".json"), "w", encoding="utf-8") as fh:
                fh.write(blob)
            done.add(pv)
            print("  %s  %5d fitur  %6.0f KB  tol %.5f"
                  % (pv, nfeat, len(blob.encode("utf-8")) / 1024, tol))
            blob = None
        shp.close()
        index = None
        manifest[level] = sorted(done)
        print()

    with open(mpath, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2)
    print("manifest.json ditulis.")
    print("Selesai. Kirim isi folder '%s' ke Claude." % args.out)


if __name__ == "__main__":
    main()
