# Referensi Dataset GIS Batas Administrasi Indonesia

**Lokasi folder:** `D:\PROJECT\Visualisasi Indeks Desa Membangun 2024 - Claude\SHP GIS`
**Disusun:** 16 Agustus 2026
**Sifat dokumen:** referensi teknis netral. Semua angka di dokumen ini diperoleh dengan membaca langsung file di folder tersebut (header SHP/SHX/DBF, tabel atribut FileGDB via GDAL 3.12.4), bukan dari klaim penyedia data. Angka pembanding resmi diambil dari sumber web yang dicantumkan di bagian Sumber.

---

## Daftar Isi

1. [Ringkasan lima dataset](#1-ringkasan-lima-dataset)
2. [Wajib dipahami dulu: dua sistem kode wilayah](#2-wajib-dipahami-dulu-dua-sistem-kode-wilayah)
3. [Dataset 1 — BIG 10K Kelurahan/Desa (indonesia-geospasial.com)](#3-dataset-1--big-10k-kelurahandesa-indonesia-geospasialcom)
4. [Dataset 2 — batas-administrasi-indonesia (repo GitHub Alf-Anas)](#4-dataset-2--batas-administrasi-indonesia-repo-github-alf-anas)
5. [Dataset 3 — Kemendagri seamless_bad123_rev130723_1](#5-dataset-3--kemendagri-seamless_bad123_rev130723_1)
6. [Dataset 4 — RBI10K_ADMINISTRASI_DESA_20230928.gdb](#6-dataset-4--rbi10k_administrasi_desa_20230928gdb)
7. [Dataset 5 — RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb](#7-dataset-5--rbi50k_administrasi_kabkota_20230907gdb)
8. [Matriks perbandingan detail](#8-matriks-perbandingan-detail)
9. [Pemekaran wilayah dan kode Papua](#9-pemekaran-wilayah-dan-kode-papua)
10. [Kamus kode domain (KUGI/BIG)](#10-kamus-kode-domain-kugibig)
11. [Resep teknis](#11-resep-teknis)
12. [Checklist sebelum memakai data](#12-checklist-sebelum-memakai-data)
- [Lampiran A — Jumlah fitur per provinsi](#lampiran-a--jumlah-fitur-per-provinsi)
- [Lampiran B — Inventaris file dan ukuran](#lampiran-b--inventaris-file-dan-ukuran)
- [Sumber](#sumber)

---

## 1. Ringkasan lima dataset

| # | Folder / berkas | Format | Level administrasi | Geometri | Jumlah fitur | Vintage data (dari METADATA internal) | Kode Kemendagri | Kode BPS |
|---|---|---|---|---:|---:|---|---|---|
| 1 | `BATAS WILAYAH KELURAHAN-DESA 10K from www.indonesia-geospasial.com` | Shapefile | Desa/Kelurahan | PolygonZ | 83.518 | **27-12-2022** (skala 1:10.000) | ✅ lengkap (prov→desa) | ⚠️ ada field, tapi 87–89% kosong |
| 2 | `batas-administrasi-indonesia` | 4 Shapefile + arsip 2020 | Provinsi, Kab/Kota, Kecamatan, Desa/Kel | PolygonZ | 38 / 514 / 7.275 / 83.518 | **13-06-2023** (commit git); desa = turunan Dataset 1 | ✅ lengkap | ❌ tidak ada |
| 3 | `Peta Batas Administrasi Provinsi dan Kabupaten Kota from Kemendagri` | Shapefile | **Garis** batas Provinsi & Kab/Kota | **PolyLine** | 1.298 | **31-05-2021** (skala 1:50.000) | ✅ `admin1`/`admin2` (xx.xx) | ❌ tidak ada |
| 4 | `RBI10K_ADMINISTRASI_DESA_20230928.gdb` | Esri File GDB | Desa/Kelurahan | MultiPolygon ZM | 83.486 | **28-09-2023** (skala 1:10.000) | ✅ lengkap | ❌ **field ada tapi 100% kosong** |
| 5 | `RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb` | Esri File GDB | Kab/Kota (area **dan** garis) | MultiPolygon Z + MultiLineString | 548 + 1.297 | **07-09-2023** (skala 1:50.000) | ✅ lengkap, **kode Papua terbaru 91–96** | ❌ 100% kosong |

**Tiga kalimat yang paling sering menyelamatkan waktu:**

1. **Dataset 1 dan layer `Kel_Desa` di Dataset 2 adalah data yang sama.** Himpunan 83.452 kode desa keduanya identik; hanya urutan baris dan nama field yang berbeda. Jangan menganggapnya dua sumber independen.
2. **Dataset 3 berisi GARIS, bukan poligon.** Tidak bisa langsung diwarnai (choropleth) tanpa proses *polygonize*.
3. **Hanya Dataset 5 yang memakai kode provinsi Papua pasca-pemekaran (93/94/95/96) secara konsisten.** Dataset 1, 2 masih memakai 91/92 untuk keenam provinsi Papua; Dataset 4 setengah jalan.

---

## 2. Wajib dipahami dulu: dua sistem kode wilayah

Indonesia punya **dua** sistem penomoran wilayah yang berbeda dan **tidak bisa saling dikonversi dengan aturan sederhana** di level kecamatan ke bawah.

### 2.1 Kode Kemendagri (PUM — Pemerintahan Umum)

Ditetapkan lewat Kepmendagri/Permendagri. Format berpisah titik:

```
32              Provinsi              (2 digit)
32.02           Kabupaten/Kota        (2+2)
32.02.44        Kecamatan/Distrik     (2+2+2)
32.02.44.2002   Kelurahan/Desa        (2+2+2+4)
```

**Aturan segmen keempat (terverifikasi di data ini, 100% konsisten pada Dataset 4):**

| Awalan segmen ke-4 | Artinya | Jumlah di Dataset 4 |
|---|---|---:|
| `1xxx` | **Kelurahan** (`TIPADM = 2`) | 8.468 |
| `2xxx` | **Desa** (`TIPADM = 1`) | 74.917 |
| `3xxx` | Desa/unit lain (UPT, desa persiapan) — masih `TIPADM = 1` | 14 |

**Segmen kedua ≥ 71 berarti Kota, < 71 berarti Kabupaten.** Terverifikasi di Dataset 5: 98 dari 98 baris `TIPADM = 5` (Kota) berkode `xx.7x`, dan 425 dari 425 baris `TIPADM = 4` (Kabupaten) tidak.

### 2.2 Kode BPS

Format tanpa titik, panjang berbeda, dan **nomor kecamatan/desa TIDAK sama dengan nomor Kemendagri**:

```
32              Provinsi              (2 digit)  — sama dengan Kemendagri
3202            Kabupaten/Kota        (4 digit)  — sama, hanya titiknya dihapus
3202081         Kecamatan             (7 digit)  — NOMOR BERBEDA
3202081002      Kelurahan/Desa        (10 digit) — NOMOR BERBEDA
```

Contoh nyata dari Dataset 1, satu baris yang sama:

| Field | Nilai | Sistem |
|---|---|---|
| `KDPPUM` / `KDPBPS` | `32` / `32` | provinsi — identik |
| `KDPKAB` / `KDBBPS` | `32.02` / `3202` | kab/kota — identik setelah titik dihapus |
| `KDCPUM` / `KDCBPS` | `32.02.44` / `3202081` | kecamatan — **44 ≠ 081** |
| `KDEPUM` / `KDEBPS` | `32.02.44.2002` / `3202081002` | desa — **2002 ≠ 002** |

> **Konsekuensi praktis:** kalau data tabular Anda memakai kode BPS (misal data Podes/Susenas BPS) dan shapefile-nya memakai kode Kemendagri, Anda **wajib** pakai tabel padanan (*crosswalk*). Di folder ini, satu-satunya file yang memuat kedua kode berdampingan adalah **Dataset 1** — tapi kolom BPS-nya hanya terisi ~11% (lihat §3.5), sehingga tidak layak dijadikan sumber crosswalk.

### 2.3 Hierarki di seluruh dataset ini

```
Provinsi (KDPPUM / KODE_PROV)
└── Kabupaten/Kota (KDPKAB / KODE_KK)          xx.xx
    └── Kecamatan/Distrik (KDCPUM / KODE_KEC)  xx.xx.xx
        └── Kelurahan/Desa (KDEPUM / KODE_KD)  xx.xx.xx.xxxx
```

Kode induk selalu merupakan awalan (prefix) kode anak. Ini bisa dipakai untuk agregasi tanpa spatial join:

```python
df['kode_kec']  = df['KDEPUM'].str[:8]
df['kode_kab']  = df['KDEPUM'].str[:5]
df['kode_prov'] = df['KDEPUM'].str[:2]
```

⚠️ Aturan prefix ini **tidak 100% terpenuhi** di data nyata. Di Dataset 4: `KDEPUM[:5] == KDPKAB` hanya pada 83.400 dari 83.486 baris, dan `KDEPUM[:8] == KDCPUM` pada 83.408 dari 83.486. Sekitar 80 baris punya kode yang saling bertentangan — validasi dulu sebelum agregasi.

---

## 3. Dataset 1 — BIG 10K Kelurahan/Desa (indonesia-geospasial.com)

**Folder:** `BATAS WILAYAH KELURAHAN-DESA 10K from www.indonesia-geospasial.com`
**Berkas utama:** `Batas_Wilayah_KelurahanDesa_10K_AR.shp`

### 3.1 Identitas & asal-usul

| Item | Nilai |
|---|---|
| Produsen asli | **Badan Informasi Geospasial (BIG)** — bukan indonesia-geospasial.com; situs itu hanya redistributor |
| Skala peta | **1:10.000** (dari kode metadata `TASWIL10000...`) |
| `METADATA` (seragam 83.518 baris) | `TASWIL1000020221227_DATA_BATAS_DESAKELURAHAN` → **basis data 27 Desember 2022** |
| Tanggal ekspor Shapefile | `.shp.xml` Esri `CreaDate = 20230528`; DBF *last update* = 2023-05-28 |
| Jejak path di metadata | `D:\GIS\DATA\BIG\BATAS ADMINISTRASI\2023\REST SERVICES\...` |
| `UUPP` (dasar penetapan) | 52 nilai. Dominan: *Hasil Delineasi Batas Desa 2018* (30.675), *2019* (28.280), *2017* (7.983), *Hasil Sinkronisasi Data Pemda 2019* (3.841), *Kesepakatan Teknis Batas Wilayah 2021* (2.827) |

> **Baca ini:** vintage sebenarnya adalah **akhir 2022**, walaupun file diekspor Mei 2023. Untuk data desa hasil delineasi 2017–2019, artinya sebagian batas berumur 5–8 tahun.

### 3.2 Spesifikasi teknis

| Item | Nilai |
|---|---|
| Format | ESRI Shapefile (`.shp` `.shx` `.dbf` `.prj` `.cpg` `.shp.xml`) |
| Tipe geometri | **PolygonZ** (kode 15) — punya nilai Z, rentang 0 – 1.876,82 |
| Jumlah fitur | **83.518** (SHX dan DBF konsisten) |
| Ukuran | `.shp` 1.155.680.520 B (**1,08 GiB**), `.dbf` 141.062.768 B (135 MiB), `.shx` 668.244 B |
| Bounding box | `94,97191105  -11,00761538  →  141,02004179  6,07683220` |
| `.prj` | `GEOGCS["GCS_WGS_1984", DATUM["D_WGS_1984", ...]]` — **ESRI-style WKT tanpa AUTHORITY**. Beberapa tool tidak mengenalinya sebagai EPSG:4326; sebaiknya paksa CRS secara eksplisit |
| `.cpg` | `UTF-8` |
| Panjang record DBF | 1.689 byte × 83.518 baris (banyak field `C(250)` → DBF membengkak) |

⚠️ **`.shp` > 1 GiB sudah menyentuh batas format Shapefile (2 GiB per file).** Jangan menambah atribut ke file ini; konversi ke GeoPackage/FlatGeobuf/Parquet dulu.

### 3.3 Kamus field (26 field)

| # | Field | Tipe | Arti | Catatan isi |
|---:|---|---|---|---|
| 1 | `OBJECTID` | N(20,0) | ID internal Esri | tidak stabil antar versi |
| 2 | `NAMOBJ` | C(250) | Nama objek (nama desa/kelurahan) | |
| 3 | `FCODE` | C(50) | Feature code KUGI | `BA03070040` (83.263), `BA03080040` (255) |
| 4 | `REMARK` | C(250) | Catatan | 1.304 nilai unik, **68.509 kosong**; isinya campur: `Sepakat`, `Perlu Klarifikasi Koordinat Desa`, `Ajudikasi 2015`, `Citra BING`, `<Null>`, `-` |
| 5 | `METADATA` | C(50) | ID metadata BIG | seragam `TASWIL1000020221227_DATA_BATAS_DESAKELURAHAN` |
| 6 | `SRS_ID` | C(50) | ID sistem referensi | **tidak seragam**: `4326` (43.225), `SRGI 2013` (39.837), kosong (456) |
| 7 | `KDBBPS` | C(50) | Kode **BPS** kab/kota | terisi 9.192 / 83.518; panjang tidak konsisten (1,2,4,5,6 char) |
| 8 | `KDCBPS` | C(50) | Kode **BPS** kecamatan | terisi 9.251; panjang 1,3,6,7,9,10 |
| 9 | `KDCPUM` | C(50) | **Kode Kemendagri kecamatan** `xx.xx.xx` | 7.275 unik, 20 kosong |
| 10 | `KDEBPS` | C(50) | Kode **BPS** desa/kel | terisi 9.263; 115 kode duplikat (1.150 baris) |
| 11 | `KDEPUM` | C(50) | **Kode Kemendagri desa/kel** `xx.xx.xx.xxxx` — *kunci join utama* | 83.452 unik, 37 kosong, 10 kode duplikat |
| 12 | `KDPBPS` | C(50) | Kode **BPS** provinsi | terisi 10.396 / 83.518 |
| 13 | `KDPKAB` | C(50) | **Kode Kemendagri kab/kota** `xx.xx` | 522 unik, 5 kosong |
| 14 | `KDPPUM` | C(50) | **Kode Kemendagri provinsi** `xx` | **hanya 34 unik** ← kode Papua lama |
| 15 | `LUASWH` | N(24,15) | Luas wilayah | **bernilai 0 pada sampel** — jangan dipakai |
| 16 | `TIPADM` | N(20,0) | Tipe administrasi | 1=74.867, 2=8.545, **0=54, 999=49, 4=3** |
| 17 | `WADMKC` | C(50) | Nama kecamatan | |
| 18 | `WADMKD` | C(50) | Nama desa/kelurahan | |
| 19 | `WADMKK` | C(50) | Nama kab/kota | |
| 20 | `WADMPR` | C(50) | Nama provinsi | **38 nama, sudah termasuk 6 provinsi Papua baru** |
| 21 | `WIADKC` | C(50) | Wilayah *indikatif* kecamatan | terisi 3.580 |
| 22 | `WIADKK` | C(50) | Wilayah *indikatif* kab/kota | terisi 3.763 |
| 23 | `WIADPR` | C(50) | Wilayah *indikatif* provinsi | terisi 3.687 |
| 24 | `WIADKD` | C(50) | Wilayah *indikatif* desa | terisi 2.222 |
| 25 | `UUPP` | C(150) | Dasar hukum/penetapan | 52 nilai |
| 26 | `LUAS` | N(24,15) | Luas (satuan tidak dinyatakan; nilai ~11–28 pada sampel Sukabumi → kemungkinan km²) | terisi |

> Field `WIAD*` terisi ketika wilayah tersebut **masih indikatif / belum disepakati**. Ada 2.222–3.763 baris seperti itu — ~3–4% dari total.

### 3.4 Cakupan

- **83.518 poligon** desa/kelurahan, 38 provinsi (`WADMPR`), 522 kode kab/kota, 7.275 kode kecamatan.
- Angka resmi pembanding (Kepmendagri 2025): 83.762 desa+kelurahan → dataset ini **kurang ± 244 entitas**.
- Rincian per provinsi: lihat [Lampiran A](#lampiran-a--jumlah-fitur-per-provinsi).

### 3.5 Kualitas data & jebakan

| Masalah | Skala | Dampak |
|---|---|---|
| **Kolom BPS hampir kosong** | `KDPBPS` kosong 73.122/83.518 (**87,6%**), `KDEBPS` kosong 74.255 (**88,9%**) | Tidak bisa dipakai untuk join ke data BPS |
| **Kode BPS yang ada pun tidak konsisten** | `KDEBPS` punya panjang 1,3,4,6,8,9,10,11,14 karakter; 115 kode duplikat pada 1.150 baris | Bahkan yang terisi pun tidak tepercaya |
| **Kode desa duplikat** | 10 kode `KDEPUM` muncul >1× (39 baris) | Join `1:1` akan menggandakan baris. Contoh: `73.09.13.2003` (2×), `73.73.04.1007` (2×) |
| **Kode placeholder** | `91.15.--.----` (16 baris), `12.--.--.----` (5), `13.--.--.----` (3), `91.08.29.----` (3), dll. | Bukan kode valid — filter dengan regex |
| **`KDEPUM` kosong** | 37 baris | Kebanyakan `NAMOBJ = "Area Tidak Terdefinisi"` (danau, area sengketa, laut) |
| **`TIPADM` tidak bersih** | Nilai `0` (54 baris — semuanya kelurahan Kota Surakarta), `999` (49), `4` (3) | Filter `TIPADM IN (1,2)` akan membuang 106 baris, termasuk 54 kelurahan Solo yang sah |
| **`SRS_ID` campur** | `4326` vs `SRGI 2013` vs kosong | Bukan masalah geometris (SRGI2013 ≈ WGS84 untuk keperluan visualisasi), tapi menandakan data hasil gabungan multi-sumber |
| **`LUASWH` = 0** | seluruh sampel | Hitung ulang luas sendiri dengan proyeksi equal-area |
| **Satu baris `NAMOBJ = "Indonesia"`** | 1 baris tanpa kode dan tanpa provinsi | Kemungkinan poligon sisa/artefak |

**Regex penyaring kode valid:**

```python
import re
VALID_DESA = re.compile(r'^\d{2}\.\d{2}\.\d{2}\.\d{4}$')
mask = df['KDEPUM'].fillna('').str.match(VALID_DESA)
# Dataset 1: menyisakan ~83.479 dari 83.518 baris
```

---

## 4. Dataset 2 — batas-administrasi-indonesia (repo GitHub Alf-Anas)

**Folder:** `batas-administrasi-indonesia`
**Asal:** klon git dari `https://github.com/Alf-Anas/batas-administrasi-indonesia`
**Mirror unduhan per-wilayah:** `https://batas-admin.geoit.dev/`

### 4.1 Riwayat git (penting untuk menentukan vintage)

| Commit | Tanggal | Isi |
|---|---|---|
| `f99ecb1` | 2026-04-15 | *Update README with download link* — **hanya README, bukan data** |
| `15115f7` | **2023-06-13** | Batas kecamatan dan batas kelurahan/desa |
| `c3b891c` | **2023-06-13** | Batas provinsi dan kabupaten kota |
| `bf63818` | 2023-06-13 | Batas desa SHP dan GeoPackage |
| `5f83c4b` … `6d1b332` | 2020-07 s/d 2020-11 | Arsip data 2018/2020 (folder `2020/`) |

➡️ **Vintage data = 13 Juni 2023.** Commit 2026 hanya menyentuh README, jadi jangan tertipu tanggal file terbaru.

### 4.2 Empat layer utama

| Layer | Fitur | Field | Ukuran `.shp` | Ukuran `.dbf` |
|---|---:|---:|---:|---:|
| `Provinsi/Provinsi.shp` | 38 | 3 | 263.482.208 B (251 MiB) | 4.348 B |
| `Kab_Kota/Kab_Kota.shp` | 514 | 5 | 340.073.992 B (324 MiB) | 108.648 B |
| `Kecamatan/Kecamatan.shp` | 7.275 | 7 | 574.475.088 B (548 MiB) | 4.037.883 B |
| `Kel_Desa/Kel_Desa.shp` | 83.518 | 12 | 1.155.681.332 B (**1,08 GiB**) | 78.924.928 B |

Semuanya **PolygonZ**, `.prj` ESRI `GCS_WGS_1984`, `.cpg` `UTF-8`, plus `.qmd` (metadata QGIS 3.28.6 — isinya kosong, tidak informatif).

> ⚠️ **Layer Provinsi berukuran 251 MB untuk 38 poligon.** Semua level memakai geometri hasil *dissolve* dari data desa 1:10.000, jadi tidak ada versi ringan. Untuk peta web, wajib disederhanakan (lihat §11.4).

### 4.3 Kamus field

**`Provinsi.dbf` (38 baris)**

| Field | Tipe | Catatan |
|---|---|---|
| `KODE_PROV` | C(50) | **hanya 34 nilai unik untuk 38 baris** — 4 provinsi Papua berbagi kode `91`, 2 berbagi `92` |
| `PROVINSI` | C(50) | 38 nama, sudah termasuk Papua Tengah/Selatan/Pegunungan/Barat Daya |
| `FID` | C(10) | duplikat `KODE_PROV` |

**`Kab_Kota.dbf` (514 baris)** — `KODE_KK` (`xx.xx`, 514 unik, 0 kosong), `KODE_PROV`, `KAB_KOTA`, `PROVINSI`, `FID`

**`Kecamatan.dbf` (7.275 baris)** — `KODE_KEC` (`xx.xx.xx`, 7.275 unik, semua 8 karakter, 0 duplikat), `KODE_KK`, `KODE_PROV`, `KECAMATAN`, `KAB_KOTA`, `PROVINSI`, `FID`

**`Kel_Desa.dbf` (83.518 baris)**

| Field | Tipe | Catatan |
|---|---|---|
| `FID` | N(20) | urut 1..n |
| `NAME` | C(250) | nama desa/kelurahan (= `NAMOBJ` di Dataset 1) |
| `KODE_KEC` | C(50) | = `KDCPUM` |
| `KODE_KD` | C(50) | = `KDEPUM` — **kunci join** |
| `KODE_KK` | C(50) | = `KDPKAB` |
| `KODE_PROV` | C(50) | = `KDPPUM` |
| `TIPE_KD` | N(20) | = `TIPADM` |
| `KECAMATAN`, `KEL_DESA`, `KAB_KOTA`, `PROVINSI` | C(50) | nama-nama wilayah |
| `JENIS_KD` | C(254) | label turunan `TIPE_KD` |

### 4.4 Temuan penting: `Kel_Desa` = Dataset 1

Perbandingan langsung baris-per-baris dan himpunan kode:

| Uji | Hasil |
|---|---|
| Jumlah fitur | 83.518 = 83.518 ✅ |
| Himpunan kode desa (`KODE_KD` vs `KDEPUM`) | **identik** — 83.452 kode unik di keduanya ✅ |
| Ukuran `.shp` | 1.155.681.332 vs 1.155.680.520 (selisih 812 B = header/metadata) |
| Bounding box & rentang Z | identik (`0 – 1876,8178`) |
| Kecocokan **baris-per-baris** | hanya 533 / 83.518 → **urutan baris diacak/di-sort ulang** |
| Jumlah fitur per provinsi | identik persis di 38 provinsi |

➡️ **Kesimpulan: `Kel_Desa` adalah re-ekspor Dataset 1** dengan field disederhanakan (26 → 12) dan baris diurut ulang berdasarkan nama. Ini bukan sumber independen — memakai keduanya tidak menambah informasi apa pun kecuali kolom BPS (yang toh 88% kosong di Dataset 1).

### 4.5 Kualitas data & jebakan

| Masalah | Skala | Detail |
|---|---|---|
| **Kode provinsi Papua salah** | 6 provinsi | `KODE_PROV` = `91` untuk Papua, Papua Tengah, Papua Selatan, Papua Pegunungan; `92` untuk Papua Barat dan Papua Barat Daya. README repo mengakui hal ini. |
| **Nama ≠ kode** | tabel Provinsi | `GROUP BY KODE_PROV` menggabungkan 4 provinsi Papua jadi satu. Selalu group by `PROVINSI` (nama) atau perbaiki kodenya dulu. |
| **6 baris placeholder di Kecamatan** | 6 dari 7.275 | Kode `12.--.--`, `13.--.--`, `35.--.--`, `64.--.--`, `73.--.--`, `82.--.--` dengan `KECAMATAN` dan `KAB_KOTA` kosong (danau/hutan/area tak terdefinisi). **Kecamatan riil = 7.269.** |
| **`KODE_KK` di Kecamatan > jumlah kab/kota** | 520 unik vs 514 | 6 selisihnya adalah placeholder di atas |
| **`JENIS_KD` tidak bersih** | 106 baris | `Desa` 74.867, `Kelurahan` 8.545, tapi juga `999` (49), `0` (54), `4` (3). **54 kelurahan Kota Surakarta berlabel `0`** — kalau difilter `JENIS_KD IN ('Desa','Kelurahan')`, seluruh Kota Solo hilang dari peta |
| **`KODE_KD` kosong / duplikat** | 37 kosong, 10 kode duplikat (39 baris) | sama persis dengan Dataset 1 |
| **Panjang `KODE_KD` menyimpang** | 1 baris 27 karakter, 1 baris 12 karakter | |

### 4.6 Subfolder `2020/` — arsip historis (jangan dipakai untuk 2024)

Berisi ekstraksi portal GIS Dukcapil Kemendagri **data 2018 Semester 1** (menurut README repo) — praktis usang untuk analisis 2024, tapi berguna untuk analisis perubahan.

| Berkas | Ukuran | Jumlah fitur (dihitung dari header `.shx` di dalam ZIP) |
|---|---:|---:|
| `batas_provinsi/Batas Provinsi SHP.zip` | 753.577 B | **34 provinsi** (pra-pemekaran Papua) |
| `Batas Kabupaten SHP.zip` | 30.666.583 B | **522** |
| `Batas Kecamatan SHP.zip` | 74.152.618 B | **7.223** |
| `batas_desa_shp/Batas Desa SHP_2.zip.001…007` | 292.278.736 B total | ZIP bersarang → berisi `Batas Desa SHP.zip` (292 MB) |
| `batas_desa_gpkg/Kemendagri-2020semester1-BatasDesa.zip.001…004` | 146.406.966 B total | GeoPackage `Kemendagri-2020semester1-BatasDesa.gpkg` (294.780.928 B) |
| `batas_provinsi/batas_provinsi.geojson` | 2.781.356 B | versi GeoJSON provinsi |
| `batas_provinsi/Batas-Provinsi.kml` | 2.923.469 B | versi KML |

Cara menyatukan berkas terpisah:

```bash
cat "Batas Desa SHP_2.zip."00* > desa.zip && unzip desa.zip     # menghasilkan ZIP lagi
cat "Kemendagri-2020semester1-BatasDesa.zip."00* > desa_gpkg.zip && unzip desa_gpkg.zip
```

Folder ini juga memuat `Banding.PNG` (perbandingan ketelitian provinsi vs kabupaten) dan `Batas Administrasi.PNG`.

---

## 5. Dataset 3 — Kemendagri `seamless_bad123_rev130723_1`

**Folder:** `Peta Batas Administrasi Provinsi dan Kabupaten Kota from Kemendagri`

### 5.1 Identitas

| Item | Nilai |
|---|---|
| Berkas | `seamless_bad123_rev130723_1.{shp,shx,dbf,prj,cst}` |
| Tipe geometri | **PolyLine** (kode 3) — **GARIS, bukan poligon** |
| Jumlah fitur | **1.298** segmen garis batas |
| Ukuran | `.shp` 28.198.216 B (27 MiB), `.dbf` 5.565.391 B |
| Bounding box | `95,27240528  -10,29285001  →  141,00273536  5,61196462` |
| `.prj` | WKT lengkap dengan `AUTHORITY["EPSG","4326"]` ✅ (satu-satunya dataset dengan PRJ yang eksplisit) |
| Encoding | file **`.cst`** (bukan `.cpg`) berisi `UTF-8` — **GDAL/QGIS tidak membaca `.cst`**; salin jadi `.cpg` atau set `SHAPE_ENCODING=UTF-8` |
| `METADATA` internal | `TASWIL5000020210531KABKOTA` (1.295 baris) → **basis data 31 Mei 2021, skala 1:50.000**; 2 baris `TASWIL5000020220921KABKOTA` |
| Nama file `rev130723` | menandakan revisi 13 Juli 2023, tapi **isi metadatanya menyatakan 2021** — vintage efektif 2021 |
| Jejak konversi | field huruf kecil semua + kolom `ogc_fid` → hasil `ogr2ogr` dari PostGIS/GDAL |

### 5.2 Kamus field (26 field)

| Field | Tipe | Arti | Isi terukur |
|---|---|---|---|
| `ogc_fid` | N(9) | ID hasil konversi GDAL | 1..1298 |
| `objectid` | N(19) | ID asal Esri | |
| `namobj` | C(254) | Nama segmen | format `"Wilayah A - Wilayah B"`, mis. `Aceh Tenggara - Langkat` |
| `fcode` | C(254) | Feature code KUGI | `BA02060040` (1.190), `BA02070040` (73), `BA02050040` (21), kosong (12), `BA03040060` (2) |
| `remark` | C(254) | Sumber garis | `Data Digital Kemendagri` (325), `Data Digital Permendagri` (246), `Garis Bantu` (208+23), `Sesuai Dengan Peta Lampiran` (43), `Data digital Kemendagri edisi April 2022` (32+23), `RBI 50K Launching 2016` (23) |
| `metadata` | C(254) | ID metadata BIG | `TASWIL5000020210531KABKOTA` |
| `srs_id` | C(254) | `4326` (1.297) | |
| `admin1` | C(254) | **Kode PUM kab/kota sisi 1** | `xx.xx`, terisi 1.295, 394 nilai unik |
| `admin2` | C(254) | **Kode PUM kab/kota sisi 2** | `xx.xx`, terisi 1.295, 393 nilai unik |
| `karktr` | N(19) | Karakteristik batas | `999` (Lainnya) 1.295, `0` 2, `3` 1 |
| `klbadm` | N(19) | **Kelas batas** | `8` = Batas Kabupaten/Kota (1.063); `7` = Batas Provinsi (233); `0` (2) |
| `pjgbts` | N(33,15) | Panjang batas | **0 pada sampel** — tidak terisi |
| `stsbts` | N(19) | **Status batas** | `1` Referensi Resmi (823), `999` Lainnya (266), `2` Hasil Kesepakatan (116), `3` Belum Ditegaskan (92) |
| `tiplok` | N(19) | Tipe lokasi | `1` Darat (1.294) |
| `tiptbt` | N(19) | Tipe batas | `2` antar kabupaten (861), `1` antar provinsi (235), `5` kota-kabupaten (104), `4` kabupaten-kota (85), `3` antar kota (12) |
| `uupp` | C(254) | Dasar hukum per segmen | **727 nilai unik**, 450 kosong. Contoh: `Permendagri Nomor 33 Tahun 2020`, `Permendagri Nomor 73 Tahun 2007` |
| `wadkc1`,`wadkc2` | C(254) | Nama kecamatan sisi 1/2 | **KOSONG SEMUA (0/1.298)** |
| `wakbk1`,`wakbk2` | C(254) | Nama kab/kota sisi 1/2 | terisi 1.296; 418 nilai unik |
| `wakld1`,`wakld2` | C(254) | Nama desa/kel sisi 1/2 | **KOSONG SEMUA (0/1.298)** |
| `wapro1`,`wapro2` | C(254) | Nama provinsi sisi 1/2 | terisi 1.297; 41 dan 40 nilai unik |
| `shape_leng`, `shape_le_1` | N(33,15) | Panjang geometri (duplikat) | |

### 5.3 Jebakan

| Masalah | Detail |
|---|---|
| **Bukan poligon** | Untuk choropleth, harus di-*polygonize* dulu (`ogr2ogr` + `-nlt POLYGON` tidak cukup; pakai GRASS `v.build.polylines`/`v.centroids`, QGIS *Polygonize*, atau shapely `polygonize()`). Sering menyisakan celah karena garis tidak *noded* sempurna. |
| **Nama file menyesatkan** | `bad123` terkesan mencakup batas administrasi level 1-2-3, tapi `wadkc*` (kecamatan) dan `wakld*` (desa) **kosong total** dan `klbadm` hanya bernilai 7 & 8. Isinya **hanya batas Provinsi dan Kab/Kota**. |
| **Padding NUL** | Field karakter di-*pad* dengan byte `\x00`, bukan spasi. Baca lalu `.replace('\x00','').strip()` — kalau tidak, string terlihat sepanjang 254 karakter. |
| **Tanggal berkas menipu** | `mtime` file = Agustus 2026, DBF *last update* = 2026-08-03. Itu tanggal penyalinan, bukan vintage data. Vintage asli = **2021-05-31** dari field `metadata`. |
| **Overlap dengan Dataset 5** | Layer `ADMINISTRASI_LN_KABKOTA` di Dataset 5 adalah data sejenis yang **2 tahun lebih baru** (2023-09-07) dengan jumlah hampir sama (1.297). Kalau butuh garis batas kab/kota, Dataset 5 lebih mutakhir. |

---

## 6. Dataset 4 — `RBI10K_ADMINISTRASI_DESA_20230928.gdb`

**Folder:** `RBI10K_ADMINISTRASI_DESA_20230928.gdb` (Esri File Geodatabase — **direktori, bukan file tunggal**)

### 6.1 Identitas

| Item | Nilai |
|---|---|
| Format | Esri File Geodatabase (FileGDB v10) |
| Layer | **`ADMINISTRASI_AR_DESAKEL`** (satu-satunya) |
| Tipe geometri | **Measured 3D MultiPolygon** (MultiPolygon ZM) |
| Jumlah fitur | **83.486** |
| Ukuran total | ± 339 MiB (berkas terbesar `a00000009.gdbtable` = 353.077.394 B) |
| CRS | `COMPD_CS["WGS 84 + EGM2008 height", GEOGCS[EPSG:4326], VERT_CS[EPSG:3855]]` — **compound CRS** |
| Bounding box | identik dengan Dataset 1 |
| `METADATA` (seragam) | `TASWIL1000020230928_DATA_BATAS_DESAKELURAHAN` → **28 September 2023, skala 1:10.000** |
| `FCODE` (seragam) | `BA03070040` — 100% konsisten |
| `SRS_ID` (seragam) | `SRGI 2013` — 100% konsisten |
| `UUPP` | *Hasil Delineasi Batas Desa 2018* (29.128), *2019* (27.006), *2017* (7.714), *Kesepakatan Teknis 2021* (3.725), *Sinkronisasi Pemda 2019* (3.406), *2016* (2.422) |

### 6.2 Kamus field (24 atribut + 2 field geometri)

Skema **identik** dengan Dataset 1 (§3.3), kecuali:

- Tidak ada `OBJECTID` sebagai kolom biasa (jadi FID internal GDB)
- `LUASWH` bertipe `float64`, `TIPADM` bertipe `int32`
- Field geometri bernama `Shape_Length` dan `Shape_Area` (bukan `LUAS`)
- `WIADKD` bertipe teks (di Dataset 5 bertipe angka)

### 6.3 Kualitas: jauh lebih bersih dari Dataset 1

| Aspek | Dataset 1 (Shapefile) | **Dataset 4 (GDB)** |
|---|---|---|
| Jumlah fitur | 83.518 | 83.486 |
| `KDEPUM` duplikat | 10 kode / 39 baris ❌ | **0 duplikat** ✅ |
| `KDEPUM` kosong | 37 | 87 |
| `TIPADM` | 1, 2, **0, 999, 4** ❌ | **hanya 1 dan 2** ✅ |
| `SRS_ID` | campur 3 nilai ❌ | seragam `SRGI 2013` ✅ |
| `FCODE` | 2 nilai | seragam ✅ |
| Kode BPS | terisi ~11% | **kosong 100%** ❌ |
| Kode provinsi Papua | 34 unik (semua lama) | **37 unik** — sudah ada 93, 94, 95 |

### 6.4 Jebakan spesifik

| Masalah | Detail |
|---|---|
| **Semua field BPS kosong total** | `KDPBPS`, `KDBBPS`, `KDCBPS`, `KDEBPS` = 0 nilai terisi dari 83.486 baris. Kolomnya ada, isinya tidak. |
| **Kode Papua setengah jalan** | `KDPPUM` punya 37 nilai unik: sudah ada `93` (Papua Selatan), `94` (Papua Tengah), `95` (Papua Pegunungan), **tapi tidak ada `96`**. Rinciannya:<br>• Papua Barat Daya → 1.009 baris masih berkode `92`<br>• Papua Tengah → **terbelah**: 15 baris berkode `91`, 1.191 baris berkode `94` |
| **Prefix hierarki tidak konsisten** | `KDEPUM[:5] == KDPKAB` hanya 83.400/83.486; `KDEPUM[:8] == KDCPUM` 83.408/83.486 |
| **CRS compound** | Sebagian pustaka (Leaflet/Mapbox pipeline, beberapa versi Shapely/PostGIS) bingung dengan `COMPD_CS`. Paksa ke EPSG:4326 saat ekspor. |
| **Geometri ZM** | GDAL memperingatkan *"Measured (M) geometry types are not supported"*. Buang dimensi M/Z saat ekspor (`-dim XY`). |
| **Selisih besar dengan Dataset 1** | Dari 83.452 kode di Dataset 1 dan 83.399 kode di sini, hanya **78.823 yang sama**. **4.629 kode hanya ada di Dataset 1** dan **4.576 hanya ada di sini**. Ini bukan sekadar penambahan desa — ada renumbering besar-besaran antara Des-2022 dan Sep-2023. |

**Contoh kode yang hanya ada di salah satu:**

```
Hanya di Dataset 1 : 11.73.03.2022, 12.06.11.2005, 12.06.16.2001, 12.13.19.2015, 16.03.22.2002, 21.02.01.2005 …
Hanya di Dataset 4 : 12.06.04.2034, 12.06.04.2035, 12.06.04.2036, 12.13.08.2013, 15.71.01.1012, 15.71.07.1011 …
```

---

## 7. Dataset 5 — `RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb`

### 7.1 Identitas

| Item | Nilai |
|---|---|
| Format | Esri File Geodatabase (FileGDB v10) |
| **Dua layer** | `ADMINISTRASI_AR_KABKOTA` (MultiPolygon Z, **548 fitur**)<br>`ADMINISTRASI_LN_KABKOTA` (MultiLineString, **1.297 fitur**) |
| Ukuran total | ± 94 MiB |
| CRS | `COMPD_CS["WGS 84 + EGM2008 height"]` (EPSG:4326 + EPSG:3855) |
| `METADATA` (seragam, kedua layer) | `TASWIL5000020230907KABKOTA` → **7 September 2023, skala 1:50.000** |
| Bounding box AR | identik dengan dataset 10K |
| Bounding box LN | `95,27240528  -10,29285001  →  141,00273536  5,61196462` |

### 7.2 Layer `ADMINISTRASI_AR_KABKOTA` (poligon)

**Skema:** sama dengan layer desa (§3.3) + `SHAPE_Length`, `SHAPE_Area`. `FCODE` seragam `BA03050040`.

**Isi `TIPADM`** (semua terverifikasi silang dengan pola kode):

| `TIPADM` | Arti | Jumlah | Verifikasi |
|---:|---|---:|---|
| 4 | **Kabupaten** | 425 | 425/425 berkode `xx.0x`–`xx.6x` ✅ |
| 5 | **Kota** | 98 | 98/98 berkode `xx.7x` ✅ — persis jumlah kota resmi di Indonesia |
| 999 | Lainnya / belum ditetapkan | 21 | pulau bermasalah, tanpa kode kab/kota |
| 6 | (level provinsi) | 4 | pulau yang baru ditetapkan ke provinsi, belum ke kab/kota |

> **548 poligon untuk 514 kab/kota.** Selisihnya: 21+4 = 25 poligon "bermasalah", ditambah beberapa kab/kota yang dipecah jadi >1 poligon (Sulawesi Tenggara `74.07` muncul 3×; `74.03`, `74.04`, `74.10` masing-masing 2×; Kepulauan Riau +1). Kalau butuh **tepat satu poligon per kab/kota**, lakukan `dissolve` berdasarkan `KDPKAB` dan filter `TIPADM IN (4,5)`.

**Kolom `REMARK` sangat informatif di layer ini** — memuat alasan hukum tiap anomali:

```
"Berdasarkan Kepmendagri 050-145 Tahun 2022, masuk ke Sumatera Utara"        (5×)
"Berdasarkan Kepmendagri 050-145 Tahun 2022, masuk ke Maluku Utara"          (3×)
"Berdasarkan Kepmendagri 050-145 Tahun 2022, masuk ke Sumatera Barat"        (3×)
"Berdasarkan Kepmendagri 2022-100.1.1-6117, Pulau Vatskoit masuk ke Kota Tual"
"Danau Moat, area bermasalah"  →  KDPKAB = "71.05/71.10"  (nilai kode ganda!)
"Wilayah terapung"                                                           (6×)
"Pulau Bermasalah"
"Tidak ada titik pulau di gazeter 2021"
```

**Field yang kosong di layer ini:** `KDCPUM`, `KDEPUM`, `WADMKC`, `WADMKD` (level kecamatan/desa tidak berlaku), dan **seluruh field BPS** (`KDPBPS`, `KDBBPS`, `KDCBPS`, `KDEBPS`). `WIADKD` bertipe angka dan bernilai `0.0` untuk semua baris — tidak berguna.

### 7.3 Layer `ADMINISTRASI_LN_KABKOTA` (garis)

**Skema:** sama dengan Dataset 3 (§5.2) **plus** kolom `RuleID` (simbologi Esri), tanpa `ogc_fid`. `FCODE` seragam `BA02050040`.

| Field | Isi |
|---|---|
| `KLBADM` | `8` Batas Kabupaten/Kota (1.063), `7` Batas Provinsi (234) |
| `TIPTBT` | `2` antar kabupaten (855), `1` antar provinsi (234), `5` kota-kabupaten (101), `4` kabupaten-kota (95), `3` antar kota (12) |
| `STSBTS` | `1` Referensi Resmi (812), `999` Lainnya (266), `2` Hasil Kesepakatan (110), `3` Belum Ditegaskan (108) |
| `KARKTR` | `999` seluruhnya |
| `TIPLOK` | `1` Darat (1.294), `2` Laut (1) |
| `REMARK` | `Data Digital Kemendagri` (244), `Data Digital Permendagri` (222), `Garis Bantu` (209), **`Data digital Kemendagri edisi April 2023`** (87), `Data digital Kemendagri edisi Agustus 2022` (39) |
| `UUPP` | 725 nilai unik, 646 baris kosong |
| `WADKC*`, `WAKLD*` | kosong (1 dan 0 baris terisi) |
| `SRS_ID` | tidak seragam: `4326` (973), kosong (159), spasi (116) |

**Konsistensi `KLBADM` terverifikasi 100%:**

| `KLBADM` | `WAPRO1 ≠ WAPRO2` | `WAPRO1 = WAPRO2` |
|---:|---:|---:|
| 7 (Batas Provinsi) | **234** | 0 |
| 8 (Batas Kab/Kota) | 0 | **1.063** |

Artinya `KLBADM` bisa dipercaya sepenuhnya untuk memisahkan garis batas provinsi dari garis batas kabupaten.

### 7.4 Mengapa dataset ini yang paling mutakhir soal kode

`KDPPUM` memuat **38 nilai unik** — satu-satunya dataset di folder ini dengan kode provinsi Papua lengkap dan benar:

| Kode | Provinsi | Jumlah kab/kota |
|---|---|---:|
| 91 | Papua | 9 |
| 92 | Papua Barat | 7 |
| **93** | **Papua Selatan** | 4 |
| **94** | **Papua Tengah** | 8 |
| **95** | **Papua Pegunungan** | 8 |
| **96** | **Papua Barat Daya** | 6 |

Kode kab/kota-nya pun sudah dinomori ulang: `93.01 Merauke`, `94.01 Nabire`, `95.01 Jayawijaya`, `96.71 Kota Sorong`, dst.

---

## 8. Matriks perbandingan detail

### 8.1 Apa yang bisa dan tidak bisa dilakukan tiap dataset

| Kebutuhan | DS 1 | DS 2 | DS 3 | DS 4 | DS 5 |
|---|:--:|:--:|:--:|:--:|:--:|
| Poligon provinsi | ❌ | ✅ | ❌ | ❌ | ⚠️ dissolve dari kab/kota |
| Poligon kabupaten/kota | ❌ | ✅ | ❌ | ❌ | ✅ |
| Poligon kecamatan | ❌ | ✅ | ❌ | ⚠️ dissolve dari desa | ❌ |
| Poligon desa/kelurahan | ✅ | ✅ | ❌ | ✅ | ❌ |
| Garis batas provinsi | ❌ | ❌ | ✅ | ❌ | ✅ |
| Garis batas kab/kota | ❌ | ❌ | ✅ | ❌ | ✅ |
| Kode Kemendagri desa | ✅ | ✅ | ❌ | ✅ | ❌ |
| Kode BPS desa | ⚠️ 11% | ❌ | ❌ | ❌ | ❌ |
| Status batas (definitif/indikatif) | ⚠️ via `WIAD*` | ❌ | ✅ `stsbts` | ⚠️ via `WIAD*` | ✅ `STSBTS` |
| Dasar hukum per objek | ✅ `UUPP` | ❌ | ✅ `uupp` | ✅ `UUPP` | ✅ `UUPP` |
| Kode Papua pasca-pemekaran | ❌ | ❌ | ❌ | ⚠️ sebagian | ✅ |

### 8.2 Vintage — urutan dari terlama ke terbaru

```
2018 Sem-1 ──── 2021-05-31 ──── 2022-12-27 ──── (2023-06-13) ──── 2023-09-07 ──── 2023-09-28
   │                 │                │                │                 │              │
 DS2/2020/          DS3            DS1 (10K)      DS2 (turunan       DS5 (50K       DS4 (10K
 (arsip)         (garis 50K)                        dari DS1)        kab/kota)       desa)
```

### 8.3 Kelengkapan vs angka resmi

Angka resmi terakhir (Kepmendagri No. 300.2.2-2430 Tahun 2025, 23 Juni 2025 — mengubah Kepmendagri No. 300.2.2-2138 Tahun 2025 tanggal 15 Mei 2025):

| Entitas | Resmi 2025 | DS 2 | DS 1 | DS 4 | DS 5 | Selisih terkecil |
|---|---:|---:|---:|---:|---:|---|
| Provinsi | **38** | 38 nama (34 kode) | 38 nama (34 kode) | 38 nama (37 kode) | **38 nama, 38 kode** ✅ | DS 5 |
| Kabupaten | **416** | — | — | — | 425 poligon | — |
| Kota | **98** | — | — | — | **98** ✅ | DS 5 |
| Kabupaten + Kota | **514** | **514** ✅ | — | — | 523 poligon (multipart) | DS 2 |
| Kecamatan | **7.285** | 7.269 riil (+6 placeholder) | 7.275 kode | 7.293 kode | — | kurang ±16 (DS 2) |
| Kelurahan | **8.496** | 8.545 | 8.545 | 8.468 | — | — |
| Desa | **75.266** | 74.867 | 74.867 | 74.931 | — | — |
| Desa + Kelurahan | **83.762** | 83.518 | 83.518 | 83.486 | — | kurang ±244–276 |

> Angka resmi berubah setiap ada Kepmendagri baru. **Verifikasi ulang** ke JDIH Kemendagri sebelum dipakai sebagai patokan validasi.

---

## 9. Pemekaran wilayah dan kode Papua

Ini adalah risiko terbesar saat memakai kelima dataset ini bersama-sama.

### 9.1 Kronologi

| Waktu | Peristiwa |
|---|---|
| Maret 2022 | Kepmendagri 050-145 Tahun 2022 — pemutakhiran kode & data wilayah |
| Juli 2022 | UU 14/2022, 15/2022, 16/2022 → **Papua Selatan, Papua Tengah, Papua Pegunungan** |
| November 2022 | UU 29/2022 → **Papua Barat Daya** (provinsi ke-38) |
| 2022 | Kepmendagri 100.1.1-6117 Tahun 2022 → penetapan kode `93`, `94`, `95`, `96` |
| 15 Mei 2025 | Kepmendagri 300.2.2-2138 Tahun 2025 (pengganti 100.1.1-6117/2022) |
| 23 Juni 2025 | Kepmendagri 300.2.2-2430 Tahun 2025 (perubahan atas 2138/2025) |

### 9.2 Kode provinsi yang benar

| Kode | Provinsi | Ada di DS 1 | DS 2 | DS 4 | DS 5 |
|---|---|:--:|:--:|:--:|:--:|
| 91 | Papua | ✅ | ✅ | ✅ | ✅ |
| 92 | Papua Barat | ✅ | ✅ | ✅ | ✅ |
| 93 | Papua Selatan | ❌ (dipakai `91`) | ❌ (`91`) | ✅ | ✅ |
| 94 | Papua Tengah | ❌ (`91`) | ❌ (`91`) | ⚠️ 1.191 baris `94`, 15 baris `91` | ✅ |
| 95 | Papua Pegunungan | ❌ (`91`) | ❌ (`91`) | ✅ | ✅ |
| 96 | Papua Barat Daya | ❌ (`92`) | ❌ (`92`) | ❌ (semua 1.009 baris `92`) | ✅ |

### 9.3 Kode kabupaten/kota Papua yang berubah

Perbandingan langsung himpunan kode `xx.xx` antara DS 2 (lama) dan DS 5 (baru): **26 kode diganti**.

| Kode lama (DS 1, 2) | Kode baru (DS 5) | Wilayah |
|---|---|---|
| `91.01` | `93.01` | Merauke |
| `91.16` | `93.02` | Boven Digoel |
| `91.17` | `93.03` | Mappi |
| `91.18` | `93.04` | Asmat |
| `91.04` | `94.01` | Nabire |
| `91.07` | `94.02` | Puncak Jaya |
| `91.08` | `94.03` | Paniai |
| `91.09` | `94.04` | Mimika |
| `91.25` | `94.05` | Puncak |
| `91.26` | `94.06` | Dogiyai |
| `91.27` | `94.07` | Intan Jaya |
| `91.28` | `94.08` | Deiyai |
| `91.02` | `95.01` | Jayawijaya |
| `91.12` | `95.02` | Pegunungan Bintang |
| `91.13` | `95.03` | Yahukimo |
| `91.14` | `95.04` | Tolikara |
| `91.21` | `95.05` | Mamberamo Tengah |
| `91.22` | `95.06` | Yalimo |
| `91.23` | `95.07` | Lanny Jaya |
| `91.24` | `95.08` | Nduga |
| `92.01` | `96.01` | Sorong |
| `92.04` | `96.02` | Sorong Selatan |
| `92.05` | `96.03` | Raja Ampat |
| `92.09` | `96.04` | Tambrauw |
| `92.10` | `96.05` | Maybrat |
| `92.71` | `96.71` | Kota Sorong |

Kode yang **tidak berubah**: 9 kab/kota Papua (`91.03`, `91.05`, `91.06`, `91.10`, `91.11`, `91.15`, `91.19`, `91.20`, `91.71`) dan 7 kab/kota Papua Barat (`92.02`, `92.03`, `92.06`, `92.07`, `92.08`, `92.11`, `92.12`).

Selain itu DS 5 punya satu kode non-standar: **`71.05/71.10`** (Danau Moat, sengketa Minahasa Selatan vs Bolaang Mongondow Timur).

### 9.4 Strategi bertahan

Ada tiga pilihan, masing-masing dengan konsekuensi:

**a) Pakai nama provinsi, bukan kode provinsi.** Semua dataset (DS 1, 2, 4, 5) sudah memakai **nama** provinsi yang benar (38 nama termasuk Papua Tengah dsb.) walaupun kodenya belum. Aman untuk agregasi/pewarnaan per provinsi, rawan untuk join lintas dataset (variasi ejaan: `Daerah Istimewa Yogyakarta` vs `DI Yogyakarta`, `DKI Jakarta` vs `Daerah Khusus Ibukota Jakarta`).

**b) Buat tabel remap kode.** Petakan 26 kode kab/kota di §9.3, lalu turunkan kode provinsi dari 2 digit pertama kode kab/kota yang sudah diperbaiki. Kode desa juga perlu di-remap (prefix 5 karakter pertama).

```python
REMAP_KAB = {
    '91.01':'93.01','91.16':'93.02','91.17':'93.03','91.18':'93.04',
    '91.04':'94.01','91.07':'94.02','91.08':'94.03','91.09':'94.04',
    '91.25':'94.05','91.26':'94.06','91.27':'94.07','91.28':'94.08',
    '91.02':'95.01','91.12':'95.02','91.13':'95.03','91.14':'95.04',
    '91.21':'95.05','91.22':'95.06','91.23':'95.07','91.24':'95.08',
    '92.01':'96.01','92.04':'96.02','92.05':'96.03','92.09':'96.04',
    '92.10':'96.05','92.71':'96.71',
}
def upgrade_kode_desa(k):            # '91.01.01.2001' -> '93.01.01.2001'
    if not isinstance(k, str) or len(k) < 5: return k
    return REMAP_KAB.get(k[:5], k[:5]) + k[5:]
```

**c) Jangan pakai kode wilayah sebagai kunci join sama sekali** — pakai *spatial join* dari data desa ke poligon kab/kota DS 5. Paling lambat, paling tahan terhadap perbedaan versi kode.

### 9.5 Pemekaran di luar Papua

Perhatikan juga:

- **Kepmendagri 050-145 Tahun 2022** memindahkan sejumlah pulau antar provinsi. DS 5 mendokumentasikannya di `REMARK` (Sumatera Utara 5 pulau, Sumatera Barat 3, Maluku Utara 3, Kalimantan Barat 1, Kalimantan Timur 1, Sulawesi Selatan 1). DS 1–4 tidak mencerminkan perubahan ini.
- **Perubahan nama:** Kota Padangsidimpuan (UU 8/2023), Kabupaten Timor Tengah Selatan, Pegunungan Bintang — ejaan berbeda antar dataset.
- **Ibu kota Kalimantan Selatan** pindah dari Banjarmasin ke Banjarbaru (UU 8/2022) — tidak berpengaruh ke geometri, tapi ke label.
- **Pemekaran desa berlanjut terus.** Selisih 4.629 vs 4.576 kode antara DS 1 (Des-2022) dan DS 4 (Sep-2023) menunjukkan laju perubahan kode desa sangat tinggi — sekitar 5,5% kode berubah dalam 9 bulan.

---

## 10. Kamus kode domain (KUGI/BIG)

Nilai-nilai domain resmi diambil dari layanan REST BIG (`geoservices.big.go.id`). Yang bertanda 🔬 diverifikasi ulang terhadap isi data di folder ini.

### `TIPADM` — Tipe Administrasi (layer poligon)

🔬 *Domain ini tidak dipublikasikan di layanan REST BIG; nilai berikut diturunkan dan diverifikasi dari data.*

| Kode | Arti | Bukti verifikasi |
|---:|---|---|
| 1 | **Desa** | 74.917/74.931 baris berkode segmen-4 `2xxx`, sisanya `3xxx` (DS 4) |
| 2 | **Kelurahan** | 8.468/8.468 baris berkode segmen-4 `1xxx` (DS 4) |
| 4 | **Kabupaten** | 425/425 baris berkode `xx.0x`–`xx.6x` (DS 5) |
| 5 | **Kota** | 98/98 baris berkode `xx.7x` (DS 5) — persis jumlah kota resmi |
| 6 | Objek level provinsi (pulau belum ditetapkan ke kab/kota) | 4 baris di DS 5, `WADMKK` kosong |
| 0 | Tidak terisi / error | 54 baris di DS 1, semuanya kelurahan Kota Surakarta |
| 999 | Lainnya / tidak terdefinisi | 49 baris DS 1 (`NAMOBJ = "Area Tidak Terdefinisi"`), 21 baris DS 5 |

### `KLBADM` — Kelas Batas Wilayah (layer garis)

| Kode | Arti |
|---:|---|
| 1 | Batas Perairan Internasional |
| 2 | Batas Perairan ZEE |
| 3 | Batas Landas Kontinen |
| 4 | Batas Zona Tambahan |
| 5 | Batas Perairan Teritorial |
| 6 | Batas Teritorial |
| **7** | **Batas Provinsi** 🔬 |
| **8** | **Batas Kabupaten/Kota** 🔬 |
| 9 | Batas Kecamatan/Distrik |
| 10 | Batas Kelurahan/Desa |
| 11 | Batas Kampung |
| 12 | Batas Perairan Teritorial 20 mil |
| 13 | Batas Perairan Provinsi |
| 14 | Batas Perairan Kabupaten |
| 15 | Batas Perairan Kecamatan/Distrik |
| 16 | Batas Perairan Desa |
| 999 | Lainnya |

### `STSBTS` — Status Batas

| Kode | Arti | DS 3 | DS 5 (LN) |
|---:|---|---:|---:|
| 1 | **Referensi Resmi** | 823 | 812 |
| 2 | **Hasil Kesepakatan** | 116 | 110 |
| 3 | **Belum Ditegaskan** | 92 | 108 |
| 999 | Lainnya | 266 | 266 |

> ~28% garis batas kab/kota berstatus *Belum Ditegaskan* atau *Lainnya*. Ini bukan cacat data — memang begitu kondisi batas administrasi di Indonesia.

### `TIPTBT` — Tipe Batas

| Kode | Arti |
|---:|---|
| 1 | antar provinsi |
| 2 | antar kabupaten |
| 3 | antar kota |
| 4 | kabupaten–kota |
| 5 | kota–kabupaten |
| 6 | antar kecamatan/distrik |
| 7 | antar desa |
| 8 | antar kelurahan |
| 9 | desa–kelurahan |
| 10 | kelurahan–desa |

### `KARKTR` — Karakteristik Batas

| Kode | Arti |
|---:|---|
| 1 | Batas Alam |
| 2 | Batas Buatan |
| 999 | Lainnya |

### `TIPLOK` — Tipe Lokasi

| Kode | Arti |
|---:|---|
| 1 | Darat |
| 2 | Laut |
| 999 | Lainnya |

### `FCODE` — Feature Code KUGI

Nilai yang muncul di folder ini (label diturunkan dari layer tempat kode itu muncul):

| FCODE | Muncul di | Kemungkinan arti |
|---|---|---|
| `BA03070040` | DS 1 (83.263), DS 4 (83.486) | Wilayah Administrasi Kelurahan/Desa (area) |
| `BA03080040` | DS 1 (255 — hanya Kota Tangerang & Sumatera Utara) | varian area desa/kelurahan |
| `BA03050040` | DS 5 AR (548) | Wilayah Administrasi Kabupaten/Kota (area) |
| `BA02050040` | DS 5 LN (1.297), DS 3 (21) | Batas Kabupaten/Kota (garis) |
| `BA02060040` | DS 3 (1.190) | Batas administrasi (garis) — varian |
| `BA02070040` | DS 3 (73) | Batas administrasi (garis) — varian |
| `BA03040060` | DS 3 (2) | anomali (kode area di layer garis) |

### `METADATA` — cara membaca

Format: `TASWIL{SKALA}{YYYYMMDD}{SUFFIX}`

```
TASWIL 10000  20221227  _DATA_BATAS_DESAKELURAHAN   → skala 1:10.000, basis data 27-12-2022
TASWIL 50000  20230907  KABKOTA                     → skala 1:50.000, basis data 07-09-2023
```

**Ini adalah cara paling andal menentukan vintage** — jauh lebih tepercaya daripada nama file atau timestamp filesystem.

---

## 11. Resep teknis

### 11.1 Membuka tiap format

```bash
# Shapefile — cek dulu tanpa memuat geometri
ogrinfo -so -al "Batas_Wilayah_KelurahanDesa_10K_AR.shp"

# Shapefile dengan encoding .cst (Dataset 3) — GDAL tidak baca .cst
SHAPE_ENCODING=UTF-8 ogrinfo -so -al "seamless_bad123_rev130723_1.shp"
# atau: copy seamless_bad123_rev130723_1.cst seamless_bad123_rev130723_1.cpg

# File Geodatabase — daftar layer dulu
ogrinfo "RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb"
ogrinfo -so -al "RBI10K_ADMINISTRASI_DESA_20230928.gdb" ADMINISTRASI_AR_DESAKEL
```

```python
# Python — pyogrio jauh lebih cepat dari fiona untuk file besar
import pyogrio
pyogrio.list_layers("RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb")

# Baca ATRIBUT SAJA (hemat memori — geometri 1 GB tidak dimuat)
df = pyogrio.read_dataframe(
    "RBI10K_ADMINISTRASI_DESA_20230928.gdb",
    layer="ADMINISTRASI_AR_DESAKEL",
    columns=["KDEPUM", "WADMKD", "WADMKK", "WADMPR", "TIPADM"],
    read_geometry=False,
)

# Baca hanya satu provinsi (SQL push-down — tidak memuat seluruh file)
gdf = pyogrio.read_dataframe(
    "RBI10K_ADMINISTRASI_DESA_20230928.gdb",
    layer="ADMINISTRASI_AR_DESAKEL",
    where="KDPPUM = '33'",     # Jawa Tengah
)
```

> **Untuk Shapefile 1 GB, jangan pakai `geopandas.read_file()` langsung.** Baca `.dbf` saja dulu (`pyogrio.read_dataframe("file.dbf", read_geometry=False)`) untuk eksplorasi atribut, dan gunakan `where=` / `bbox=` saat butuh geometri.

### 11.2 Konversi ke format kerja yang lebih baik

```bash
# GDB -> GeoPackage, paksa EPSG:4326 (buang compound CRS), buang dimensi Z/M
ogr2ogr -f GPKG desa_10k.gpkg "RBI10K_ADMINISTRASI_DESA_20230928.gdb" \
        ADMINISTRASI_AR_DESAKEL \
        -t_srs EPSG:4326 -dim XY -nln desa \
        -lco SPATIAL_INDEX=YES

# Shapefile besar -> FlatGeobuf (cepat dibaca, streaming, tanpa batas 2 GB)
ogr2ogr -f FlatGeobuf desa.fgb "Batas_Wilayah_KelurahanDesa_10K_AR.shp" \
        -t_srs EPSG:4326 -dim XY

# Atribut saja -> Parquet (untuk analisis tabular cepat)
ogr2ogr -f Parquet desa_attr.parquet "RBI10K_ADMINISTRASI_DESA_20230928.gdb" \
        ADMINISTRASI_AR_DESAKEL -select KDEPUM,WADMKD,WADMKK,WADMPR,TIPADM
```

### 11.3 Membuat poligon dari Dataset 3 (garis → area)

```bash
# 1) noding dulu supaya garis benar-benar bersambung
ogr2ogr -f GPKG lines.gpkg seamless_bad123_rev130723_1.shp -nln batas
# 2) polygonize (QGIS Processing / GRASS)
#    QGIS: Vector Geometry -> Polygonize
#    GRASS: v.clean tool=break,snap ; v.centroids
```

Alternatif Python:

```python
import geopandas as gpd
from shapely.ops import polygonize, unary_union
ln = gpd.read_file("seamless_bad123_rev130723_1.shp", encoding="utf-8")
polys = list(polygonize(unary_union(ln.geometry.values)))
ar = gpd.GeoDataFrame(geometry=polys, crs="EPSG:4326")
```

> Hasilnya **tidak otomatis punya atribut kab/kota** — perlu spatial join balik ke `admin1`/`admin2`. Kalau butuh poligon kab/kota, jauh lebih praktis pakai Dataset 5 (`ADMINISTRASI_AR_KABKOTA`) yang sudah berbentuk poligon.

### 11.4 Menyederhanakan untuk peta web

Ukuran asli tidak layak untuk browser. Urutan yang terbukti bekerja:

```bash
# a) mapshaper — penyederhanaan topologi-aware (celah antar poligon tidak muncul)
mapshaper desa.fgb \
  -simplify visvalingam 5% keep-shapes \
  -filter-fields KDEPUM,WADMKD,WADMKK,WADMPR,TIPADM \
  -o format=geojson precision=0.00001 desa_simplified.geojson

# b) untuk peta interaktif skala nasional: vector tiles
tippecanoe -o desa.pmtiles -Z4 -z12 \
           --drop-densest-as-needed --coalesce-densest-as-needed \
           --simplification=10 desa_simplified.geojson
```

Rule of thumb ukuran target:

- level provinsi (38 poligon): < 500 KB GeoJSON
- level kab/kota (514): < 2 MB
- level kecamatan (7.275): vector tiles wajib
- level desa (83.5 rb): vector tiles wajib

### 11.5 Membuat lapisan agregat dari data desa

Karena kode induk adalah prefix kode anak, agregasi bisa dilakukan tanpa spatial join:

```python
import geopandas as gpd
gdf = gpd.read_file("desa_10k.gpkg", layer="desa")
gdf = gdf[gdf["KDEPUM"].str.match(r"^\d{2}\.\d{2}\.\d{2}\.\d{4}$", na=False)]

gdf["kode_kec"]  = gdf["KDEPUM"].str[:8]
gdf["kode_kab"]  = gdf["KDEPUM"].str[:5]
gdf["kode_prov"] = gdf["KDEPUM"].str[:2]

kec  = gdf.dissolve(by="kode_kec",  aggfunc="first")
kab  = gdf.dissolve(by="kode_kab",  aggfunc="first")
prov = gdf.dissolve(by="kode_prov", aggfunc="first")
```

⚠️ `dissolve` di 83.518 poligon 1:10.000 memakan waktu dan RAM besar. Sederhanakan geometri **dulu** kalau hasilnya untuk visualisasi.

### 11.6 Pola join yang aman

```python
def join_aman(gdf, df_data, kunci_geo="KDEPUM", kunci_data="kode_desa"):
    """Join dengan pemeriksaan yang biasanya terlewat."""
    import re
    POLA = re.compile(r"^\d{2}\.\d{2}\.\d{2}\.\d{4}$")

    g = gdf[kunci_geo].fillna("").str.strip()
    d = df_data[kunci_data].fillna("").astype(str).str.strip()

    print("kode geo tidak valid  :", (~g.str.match(POLA)).sum())
    print("kode geo duplikat     :", g.duplicated().sum())
    print("kode data duplikat    :", d.duplicated().sum())
    print("ada di data, tak ada di geo :", len(set(d) - set(g)))
    print("ada di geo, tak ada di data :", len(set(g) - set(d)))

    return gdf.merge(df_data, left_on=kunci_geo, right_on=kunci_data,
                     how="left", validate="one_to_one")
```

Jalankan pemeriksaan ini **sebelum** merge — `validate="one_to_one"` akan melempar error kalau ada duplikat, dan itu memang yang Anda inginkan.

### 11.7 Membersihkan padding NUL (khusus Dataset 3)

```python
import geopandas as gpd
gdf = gpd.read_file("seamless_bad123_rev130723_1.shp", encoding="utf-8")
for c in gdf.select_dtypes("object").columns:
    if c != gdf.geometry.name:
        gdf[c] = gdf[c].astype(str).str.replace("\x00", "", regex=False).str.strip()
        gdf[c] = gdf[c].replace({"": None, "nan": None})
```

---

## 12. Checklist sebelum memakai data

```
□ Cek field METADATA untuk vintage sebenarnya — jangan percaya nama file atau mtime
□ Tentukan sistem kode target (Kemendagri atau BPS) dan pastikan SEMUA sumber sepakat
□ Kalau menyentuh Papua: putuskan strategi kode (nama / remap / spatial join) — §9.4
□ Filter kode placeholder: regex ^\d{2}\.\d{2}\.\d{2}\.\d{4}$ untuk desa
□ Hitung duplikat kunci join SEBELUM merge; pakai validate="one_to_one"
□ Jangan filter TIPADM/JENIS_KD secara membabi buta — 54 kelurahan Kota Surakarta
  akan hilang (nilainya '0', bukan 'Kelurahan')
□ Paksa CRS ke EPSG:4326 saat ekspor dari GDB (compound CRS bikin masalah)
□ Buang dimensi Z/M (-dim XY) kecuali memang dibutuhkan
□ Sederhanakan geometri sebelum dissolve, bukan sesudahnya
□ Untuk peta web: vector tiles untuk level kecamatan ke bawah, tanpa kecuali
□ Bandingkan jumlah entitas hasil akhir dengan angka Kepmendagri terbaru (§8.3)
□ Dokumentasikan dataset mana yang dipakai untuk level mana, di README proyek Anda
```

---

## Lampiran A — Jumlah fitur per provinsi

Semua angka dihitung langsung dari file. Kolom "RBI50K KabKota" hanya menghitung `TIPADM ∈ {4,5}` (Kabupaten & Kota), tidak termasuk 25 poligon anomali. Baris disusun menurut kode Kemendagri terbaru; untuk DS 1/2/4 kode Papua-nya berbeda, hanya namanya yang cocok.

| Kode | Provinsi | DS2 KabKota | DS5 KabKota | DS2 Kecamatan | DS2 Kel_Desa | DS1 desa/kel | DS4 desa/kel |
|---|---|---:|---:|---:|---:|---:|---:|
| 11 | Aceh | 23 | 23 | 290 | 6.496 | 6.496 | 6.495 |
| 12 | Sumatera Utara | 33 | 33 | 456 | 6.116 | 6.116 | 6.116 |
| 13 | Sumatera Barat | 19 | 19 | 180 | 1.163 | 1.163 | 1.164 |
| 14 | Riau | 12 | 12 | 172 | 1.860 | 1.860 | 1.860 |
| 15 | Jambi | 11 | 11 | 144 | 1.562 | 1.562 | 1.568 |
| 16 | Sumatera Selatan | 17 | 17 | 241 | 3.240 | 3.240 | 3.239 |
| 17 | Bengkulu | 10 | 10 | 129 | 1.514 | 1.514 | 1.514 |
| 18 | Lampung | 15 | 15 | 229 | 2.640 | 2.640 | 2.640 |
| 19 | Kepulauan Bangka Belitung | 7 | 7 | 47 | 393 | 393 | 393 |
| 21 | Kepulauan Riau | 7 | 8 | 76 | 420 | 420 | 420 |
| 31 | DKI Jakarta | 6 | 6 | 44 | 267 | 267 | 267 |
| 32 | Jawa Barat | 27 | 27 | 627 | 5.957 | 5.957 | 5.957 |
| 33 | Jawa Tengah | 35 | 35 | 576 | 8.562 | 8.562 | 8.561 |
| 34 | Daerah Istimewa Yogyakarta | 5 | 5 | 78 | 438 | 438 | 438 |
| 35 | Jawa Timur | 38 | 38 | 668 | 8.504 | 8.504 | 8.498 |
| 36 | Banten | 8 | 8 | 155 | 1.552 | 1.552 | 1.552 |
| 51 | Bali | 9 | 9 | 57 | 716 | 716 | 716 |
| 52 | Nusa Tenggara Barat | 10 | 10 | 117 | 1.151 | 1.151 | 1.151 |
| 53 | Nusa Tenggara Timur | 22 | 22 | 315 | 3.352 | 3.352 | 3.352 |
| 61 | Kalimantan Barat | 14 | 14 | 175 | 2.132 | 2.132 | 2.132 |
| 62 | Kalimantan Tengah | 14 | 14 | 136 | 1.571 | 1.571 | 1.571 |
| 63 | Kalimantan Selatan | 13 | 13 | 156 | 2.010 | 2.010 | 2.008 |
| 64 | Kalimantan Timur | 10 | 10 | 106 | 1.039 | 1.039 | 1.040 |
| 65 | Kalimantan Utara | 5 | 5 | 55 | 482 | 482 | 482 |
| 71 | Sulawesi Utara | 15 | 15 | 171 | 1.841 | 1.841 | 1.841 |
| 72 | Sulawesi Tengah | 13 | 13 | 175 | 2.021 | 2.021 | 2.020 |
| 73 | Sulawesi Selatan | 24 | 24 | 312 | 3.049 | 3.049 | 3.058 |
| 74 | Sulawesi Tenggara | 17 | 23 | 220 | 2.284 | 2.284 | 2.284 |
| 75 | Gorontalo | 6 | 6 | 77 | 744 | 744 | 744 |
| 76 | Sulawesi Barat | 6 | 6 | 69 | 648 | 648 | 648 |
| 81 | Maluku | 11 | 11 | 118 | 1.235 | 1.235 | 1.235 |
| 82 | Maluku Utara | 10 | 10 | 119 | 1.184 | 1.184 | 1.184 |
| 91 | Papua | 9 | 9 | 105 | 1.014 | 1.014 | 1.014 |
| 92 | Papua Barat | 7 | 7 | 86 | 824 | 824 | 828 |
| 93 | Papua Selatan | 4 | 4 | 80 | 687 | 687 | 687 |
| 94 | Papua Tengah | 8 | 8 | 130 | 1.209 | 1.209 | 1.206 |
| 95 | Papua Pegunungan | 8 | 8 | 252 | 2.627 | 2.627 | 2.593 |
| 96 | Papua Barat Daya | 6 | 6 | 132 | 1.013 | 1.013 | 1.009 |
| | **Total 38 provinsi** | **514** | **521** | **7.275** | **83.517** | **83.517** | **83.485** |
| | Baris tanpa nama provinsi | 0 | 2 | 0 | 1 | 1 | 1 |
| | **Total keseluruhan** | **514** | **523** (+25 anomali = 548) | **7.275** | **83.518** | **83.518** | **83.486** |

**Catatan anomali kolom DS5:** Kepulauan Riau 8 (bukan 7) dan Sulawesi Tenggara 23 (bukan 17) karena beberapa kabupaten kepulauan tersimpan sebagai poligon terpisah, bukan multipolygon. Lakukan `dissolve` by `KDPKAB` untuk mendapatkan 514.

---

## Lampiran B — Inventaris file dan ukuran

```
SHP GIS/
├── BATAS WILAYAH KELURAHAN-DESA 10K from www.indonesia-geospasial.com/   [DS 1]
│   ├── Batas_Wilayah_KelurahanDesa_10K_AR.shp        1.155.680.520 B
│   ├── Batas_Wilayah_KelurahanDesa_10K_AR.dbf          141.062.768 B
│   ├── Batas_Wilayah_KelurahanDesa_10K_AR.shx              668.244 B
│   ├── Batas_Wilayah_KelurahanDesa_10K_AR.prj                  145 B
│   ├── Batas_Wilayah_KelurahanDesa_10K_AR.cpg                    5 B   (UTF-8)
│   └── Batas_Wilayah_KelurahanDesa_10K_AR.shp.xml              821 B
│
├── batas-administrasi-indonesia/                                        [DS 2]
│   ├── .git/                                        (pack 1.242.229.932 B)
│   ├── README.md                                            2.056 B
│   ├── Provinsi/       Provinsi.shp      263.482.208 B  + .dbf 4.348 B
│   ├── Kab_Kota/       Kab_Kota.shp      340.073.992 B  + .dbf 108.648 B
│   ├── Kecamatan/      Kecamatan.shp     574.475.088 B  + .dbf 4.037.883 B
│   ├── Kel_Desa/       Kel_Desa.shp    1.155.681.332 B  + .dbf 78.924.928 B
│   └── 2020/                                          (arsip 2018 Sem-1)
│       ├── Batas Kabupaten SHP.zip                     30.666.583 B
│       ├── Batas Kecamatan SHP.zip                     74.152.618 B
│       ├── batas_desa_shp/Batas Desa SHP_2.zip.001-007  292.278.736 B
│       ├── batas_desa_gpkg/…BatasDesa.zip.001-004       146.406.966 B
│       ├── batas_provinsi/Batas Provinsi SHP.zip           753.577 B
│       ├── batas_provinsi/batas_provinsi.geojson         2.781.356 B
│       ├── batas_provinsi/Batas-Provinsi.kml             2.923.469 B
│       ├── Banding.PNG / Batas Administrasi.PNG
│       └── README.md
│
├── Peta Batas Administrasi Provinsi dan Kabupaten Kota from Kemendagri/  [DS 3]
│   ├── seamless_bad123_rev130723_1.shp                 28.198.216 B
│   ├── seamless_bad123_rev130723_1.dbf                  5.565.391 B
│   ├── seamless_bad123_rev130723_1.shx                     10.484 B
│   ├── seamless_bad123_rev130723_1.prj                        335 B
│   └── seamless_bad123_rev130723_1.cst                          5 B   (UTF-8)
│
├── RBI10K_ADMINISTRASI_DESA_20230928.gdb/                               [DS 4]
│   ├── a00000009.gdbtable                             353.077.394 B   ← data utama
│   ├── a00000009.spx / .gdbtablx / .gdbindexes
│   ├── a00000001-a00000007.*                          (katalog sistem GDB)
│   ├── gdb                                                      4 B
│   └── timestamps                                             400 B
│
└── RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb/                            [DS 5]
    ├── a0000000a.gdbtable                              87.567.271 B   ← layer AR
    ├── a00000009.gdbtable                              10.508.658 B   ← layer LN
    ├── a00000001-a00000007.*                          (katalog sistem GDB)
    ├── gdb                                                      4 B
    └── timestamps                                             400 B
```

**Total kasar seluruh folder: ± 5,9 GB** (termasuk 1,2 GB pack git di DS 2 yang sebenarnya duplikat dari file kerja).

> Menyalin folder `.gdb` **harus utuh** — semua berkas `a0000000*.*` + `gdb` + `timestamps`. Menyalin sebagian membuat geodatabase tidak bisa dibuka.

---

## Sumber

**Data primer** — dibaca langsung dari folder `SHP GIS` (header SHP/SHX/DBF, tabel FileGDB via GDAL 3.12.4 / pyogrio 0.13.0), riwayat git repo `batas-administrasi-indonesia`.

**Referensi domain atribut KUGI/BIG:**

- [Layer: Batas Wilayah Administrasi Desa/Kelurahan — geoservices BIG](https://geoservices.big.go.id/rbi/rest/services/BATASWILAYAH/BATAS_WILAYAH/MapServer/11)
- [Layer: Batas Kabupaten/Kota (Administrasi_LN_KabKota_50K) — geoservices BIG](https://geoservices.big.go.id/rbi/rest/services/BATASWILAYAH/Administrasi_LN_KabKota_50K/MapServer/0)
- [All Layers and Tables PUBLIK/BATAS_WILAYAH — kspservices BIG](https://kspservices.big.go.id/satupeta/rest/services/PUBLIK/BATAS_WILAYAH/MapServer/layers)

**Referensi kode & jumlah wilayah administrasi:**

- [Kepmendagri No. 300.2.2-2430 Tahun 2025 — dataset & changelog (cahyadsn/wilayah)](https://github.com/cahyadsn/wilayah)
- [Kode Wilayah Kepmendagri 2025 (yonatanyl)](https://github.com/yonatanyl/KODE-WILAYAH-KEPMENDAGRI-2025)
- [Kepmendagri No. 300.2.2-2138 Tahun 2025 (PDF, JDIH Kemendagri)](https://jdih.kemendagri.go.id/common/dokumen/Kepmen%20300.2.2-2138%20Tahun%202025.pdf)
- [Keputusan Menteri Dalam Negeri Nomor 300.2.2-2430 Tahun 2025 — Ditjen Bina Adwil](https://ditjenbinaadwil.kemendagri.go.id/peraturan/keputusan-menteri-dalam-negeri-300.2.2-2430-2025-228)
- [Kemendagri luncurkan Kepmen Kode Wilayah Administrasi 2025 — ANTARA News](https://www.antaranews.com/berita/4837297/kemendagri-luncurkan-kepmen-kode-wilayah-administrasi-2025)
- [Papua Barat Daya jadi provinsi ke-38 — Indonesia Baik](https://indonesiabaik.id/infografis/papua-barat-daya-jadi-provinsi-ke-38-indonesia)

**Sumber dataset:**

- [github.com/Alf-Anas/batas-administrasi-indonesia](https://github.com/Alf-Anas/batas-administrasi-indonesia) · [batas-admin.geoit.dev](https://batas-admin.geoit.dev/)
- [indonesia-geospasial.com](https://www.indonesia-geospasial.com/) (redistributor data BIG)
