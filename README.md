# 🇮🇩 Peta Desa Nusantara — Visualisasi & Dashboard GIS IDM 2024

<div align="center">

**Platform Analisis dan Visualisasi Spasial-Statistik Indeks Desa Membangun (IDM) 2024 Seluruh Indonesia**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Cakupan: 37 Provinsi](https://img.shields.io/badge/Cakupan-37%20Provinsi-2ea44f.svg)](#-cakupan-dan-statistik-utama)
[![Total Desa: 75.265](https://img.shields.io/badge/Total%20Desa-75.265%20Desa-0e6d80.svg)](#-profil-dan-klasifikasi-idm-2024)
[![Pipeline: Pure Python 3.8+](https://img.shields.io/badge/Pipeline-Pure%20Python%203.8+-yellow.svg)](#-arsitektur--pipeline-data)
[![Arsitektur: Static Client-Side](https://img.shields.io/badge/Arsitektur-Static%20Client--Side-orange.svg)](#-arsitektur--pipeline-data)
[![Status: Production Ready](https://img.shields.io/badge/Status-Siap%20Pakai%20%26%20Aktif-success.svg)](#)

[Fitur Utama](#-fitur-utama) • [Statistik IDM 2024](#-profil-dan-klasifikasi-idm-2024) • [Arsitektur & Pipeline](#-arsitektur--pipeline-data) • [Struktur Direktori](#-struktur-direktori) • [Panduan Menjalankan](#-panduan-instalasi--menjalankan-proyek) • [Spesifikasi Geometri](#-spesifikasi-teknis-geometri)

</div>

---

## 📌 Ringkasan Proyek

**Peta Desa Nusantara** adalah dashboard analitik GIS (*Geographic Information System*) interaktif yang memetakan status perkembangan dan kemandirian **75.265 desa** di **434 kabupaten/kota**, **6.554 kecamatan**, dan **37 provinsi** di Indonesia. Data yang ditampilkan bersumber dari data resmi **Indeks Desa Membangun (IDM) 2024** terbitan Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi (Kemendes PDTT) yang diperoleh melalui [Portal Satu Data Indonesia (data.go.id)](https://data.go.id/dataset/dataset/data-indeks-desa-membangun-tahun-2024), serta diintegrasikan secara presisi dengan batas wilayah Rupa Bumi Indonesia (RBI) dari Badan Informasi Geospasial (BIG).

### Latar Belakang & Masalah
* **Data Spasial dan Statistik Masih Terpisah:** Data nilai IDM awalnya tersimpan dalam lembar kerja spreadsheet berukuran besar (*Excel 7,7 MB*), sedangkan poligon batas wilayah desa berada di berkas *Esri File Geodatabase / Shapefile (339 MB – 1+ GB)*. Untuk menggabungkan dan menganalisis keduanya, pengguna umumnya membutuhkan keahlian teknis khusus dan aplikasi GIS berat seperti ArcGIS atau QGIS.
* **Beban Render Peta yang Berat:** Menampilkan lebih dari 83.000 poligon batas wilayah di peramban secara langsung biasanya memakan memori ratusan megabita, sehingga rentan membuat browser lambat, membeku (*freeze*), atau bahkan tertutup sendiri (*crash*).
* **Akses Informasi yang Terbatas:** Pemangku kebijakan daerah (seperti Bappeda), analis kementerian, tenaga pendamping desa, akademisi, jurnalis, hingga warga desa kerap kesulitan melihat profil perkembangan desa mereka beserta rincian indikator pembentuknya (IKS, IKE, IKL) secara instan.

### Solusi & Inovasi yang Dihadirkan
* **Arsitektur Web Statis Ringan (*Zero-Server Static GIS*):** Mengubah seluruh data tabular dan spasial menjadi berkas JSON terkompresi dan terkuantisasi, yang dimuat secara bertahap per provinsi sesuai kebutuhan (*on-demand lazy loading*).
* **Dua Mode Visualisasi Dinamis:** Menyediakan **Mode Peta Choropleth (Geografis)** dan **Mode Petak (*Grid Cartogram / Equal Area*)**. Pada mode petak, setiap desa digambarkan sebagai satu kotak berukuran seragam. Hal ini mengeliminasi bias ukuran wilayah geografis, sehingga desa-desa kecil di wilayah perkotaan maupun kepulauan terluar tetap terlihat jelas dan berbobot sama dalam analisis statistik.
* **Pipeline Pemrosesan Spasial Murni Python:** Menggunakan skrip konversi geometri (`build_geo.py`) yang memanfaatkan pustaka standar bawaan Python murni (tanpa ketergantungan pada dependensi rumit seperti GDAL, GeoPandas, atau Shapely) untuk mengolah Shapefile ratusan megabita menjadi data vektor web yang sangat ramping.

---

## 🎯 Cakupan dan Statistik Utama

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CAKUPAN DATA NASIONAL IDM 2024                        │
├───────────────────┬───────────────────┬───────────────────┬─────────────────────┤
│   75.265 Desa     │   6.554 Kecamatan │  434 Kab / Kota   │    37 Provinsi      │
├───────────────────┴───────────────────┴───────────────────┴─────────────────────┤
│ Rata-rata Skor Nasional: 0,7120        │ Rentang Skor     : 0,2176 — 1,0000     │
│ Ketahanan Sosial (IKS) : 0,7662        │ Ketahanan Lingk. (IKL): 0,7502         │
│ Ketahanan Ekonomi (IKE): 0,6198        │ Poligon Master   : 83.486 Wilayah      │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Profil dan Klasifikasi IDM 2024

Indeks Desa Membangun (IDM) membagi status perkembangan desa ke dalam **5 tingkatan kemandirian** berdasarkan nilai komposit dari tiga pilar utama: **Indeks Ketahanan Sosial (IKS)**, **Indeks Ketahanan Ekonomi (IKE)**, dan **Indeks Ketahanan Lingkungan (IKL)**.

```
       IDM = (IKS + IKE + IKL) / 3
```

| Status Desa | Rentang Nilai IDM | Kode Warna | Jumlah Desa | Proporsi (%) | Karakteristik Utama |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **MANDIRI** | $\text{IDM} > 0.8155$ | `#137a52` (Hijau Tua) | **17.203** | **22,9%** | Memiliki ketahanan sosial, ekonomi, dan ekologi yang kuat serta berkelanjutan |
| **MAJU** | $0.7073 \le \text{IDM} \le 0.8154$ | `#62a84f` (Hijau Terang) | **23.063** | **30,6%** | Memiliki potensi sumber daya memadai dengan akses pelayanan dasar yang baik |
| **BERKEMBANG** | $0.5990 \le \text{IDM} \le 0.7072$ | `#e0bd3d` (Kuning Emas) | **24.532** | **32,6%** | Memiliki potensi sumber daya yang belum optimal dikelola, akses layanan menengah |
| **TERTINGGAL** | $0.4908 \le \text{IDM} \le 0.5989$ | `#d4602b` (Oranye) | **6.100** | **8,1%** | Keterbatasan infrastruktur dasar, aksesibilitas, pelayanan publik, dan ekonomi |
| **SANGAT TERTINGGAL** | $\text{IDM} \le 0.4907$ | `#a51f2d` (Merah Tua) | **4.363** | **5,8%** | Mengalami kerentanan multidimensi, risiko bencana tinggi, isolasi geografis, dan kemiskinan |

---

## ✨ Fitur Utama

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             FITUR UTAMA DASHBOARD                                │
├─────────────────────────┬─────────────────────────┬──────────────────────────────┤
│ 🗺️ Dua Mode Visualisasi │ 🔍 Eksplorasi 4 Tingkat │ 📈 Panel Analitik Interaktif │
│ • Mode Peta Choropleth  │ • Nasional ➔ Provinsi   │ • Perbandingan Delta KPI     │
│ • Mode Petak Cartogram  │ • Kab/Kota ➔ Kecamatan  │ • Histogram Sebaran IDM      │
│ • Render Canvas / WebGL │ • Breadcrumb Interaktif │ • Papan Peringkat Wilayah    │
├─────────────────────────┼─────────────────────────┼──────────────────────────────┤
│ ⚡ Pencarian Cepat      │ 🏷️ Profil Detail Desa   │ 📥 Ekspor Data Lengkap       │
│ • Pencocokan Cerdas     │ • Rincian Sub-Indeks    │ • Unduh Tabel (.CSV)         │
│ • Auto-center & Zoom    │ • Asal Data (Provenance)│ • Tangkapan Peta Resolusi HD │
│ • Filter Kategori Status│ • Analisis Komparasi    │ • Tabel Data Cepat & Ringan  │
└─────────────────────────┴─────────────────────────┴──────────────────────────────┘
```

### 1. 🗺️ Dua Mode Visualisasi (Peta vs Petak)
* **Mode Peta Geografis (*GIS Choropleth*):** Menampilkan poligon batas administratif wilayah secara akurat dengan akselerasi GPU Canvas pada kecepatan rendering 60 FPS.
* **Mode Petak (*Equal-Area Grid Cartogram*):** Setiap desa disajikan dalam kotak modular berukuran sama dengan warna sesuai statusnya. Mode ini sangat efektif untuk menghilangkan bias ukuran geografis, memastikan desa-desa berwilayah sempit di kawasan perkotaan maupun pulau-pulau kecil tetap terlihat jelas dan berbobot setara saat dianalisis.

### 2. 🔍 Eksplorasi Wilayah Bertingkat (*4-Level Drill-Down*)
* Pengguna dapat menelusuri data secara terstruktur: **Nasional (37 Provinsi)** $\rightarrow$ **Provinsi** $\rightarrow$ **Kabupaten/Kota** $\rightarrow$ **Kecamatan** $\rightarrow$ **Detail Desa**.
* Dilengkapi **jalur navigasi interaktif (*breadcrumbs*)**, tombol kembali ke tingkat atas (*Go Up*), dan menu dropdown dinamis untuk berpindah wilayah secara cepat.

### 3. 📈 Panel Analitik Komprehensif
* **Kartu Indikator Kunci (KPI):** Menampilkan total desa, rata-rata skor IDM wilayah terpilih, selisih ($\pm \Delta$) terhadap rata-rata nasional, persentase desa Mandiri, serta konsentrasi desa Tertinggal/Sangat Tertinggal.
* **Bagan Distribusi & Legenda Interaktif:** Menampilkan proporsi 5 kategori status IDM. Klik pada salah satu label status untuk menyaring atau menyembunyikan kategori tersebut di peta dan tabel secara seketika (*interactive filter*).
* **Papan Peringkat Wilayah (*Leaderboard*):** Menampilkan 14 wilayah dengan nilai tertinggi atau terendah, yang dapat dialihkan urutannya (*tertinggi dulu / terendah dulu*) dengan satu klik.
* **Histogram Sebaran IDM (24 Interval):** Grafik distribusi nilai IDM lengkap dengan garis penunjuk rata-rata (*mean indicator*) dan *tooltip* interaktif per rentang nilai.
* **Komparasi Sub-Indeks (IKS, IKE, IKL):** Visualisasi selisih capaian ketiga pilar ketahanan wilayah terhadap standar rata-rata nasional.

### 4. 🏷️ Kartu Rincian & Profil Mendalam Tiap Desa
Memilih desa mana pun (melalui peta, petak cartogram, tabel data, atau hasil pencarian) akan menampilkan kartu profil lengkap:
* Skor komposit IDM (hingga 4 desimal) serta perbandingannya dengan rata-rata nasional.
* Rincian nilai ketiga pilar: **IKS (Ketahanan Sosial)**, **IKE (Ketahanan Ekonomi)**, dan **IKL (Ketahanan Lingkungan)**.
* **Lencana Status Data (*Data Provenance*):** Penanda informasi khusus desa, seperti status data *Pembaruan 2023*, *Server PDN*, atau *Reguler*.

### 5. ⚡ Pencarian Cepat & Cerdas (*Instant Search*)
* Pencarian data desa secara langsung dengan dukungan pencocokan fleksibel (*substring & fuzzy search*).
* Menampilkan daftar saran lengkap dengan indikator warna status, nama kecamatan, dan kabupaten asal.
* Mengklik hasil pencarian akan langsung mengarahkan tampilan kamera peta (*pan & zoom*) ke lokasi desa yang dipilih.

### 6. 📑 Tabel Data Interaktif & Ekspor
* **Tabel Terurut Dinamis:** Menampilkan seluruh baris desa atau provinsi dalam cakupan aktif, dengan dukungan pengurutan berdasarkan Nama, Nilai IDM, IKS, IKE, IKL, maupun Kategori Status.
* **Ekspor CSV:** Mengunduh seluruh data tabel yang sedang aktif ke format `.csv` dengan satu klik.
* **Ekspor Gambar Peta (PNG):** Menyimpan tampilan visual peta dalam resolusi tinggi langsung ke format berkas gambar `.png`.

---

## 🏗️ Arsitektur & Pipeline Data

Proyek ini dibangun dengan prinsip **"Heavy build-time, ultra-light runtime"**. Karena data IDM 2024 merupakan data tahunan yang bersifat statis, seluruh proses komputasi yang berat (penggabungan data tabular, reduksi presisi koordinat, kuantisasi, penyederhanaan topologi poligon, hingga pemisahan berkas per provinsi) diselesaikan di awal pada tahap pembangunan data (*build time*).

```mermaid
flowchart TD
    subgraph DataSources["📁 SUMBER DATA MENTAH"]
        A1["📊 Data Tabular IDM 2024<br/>(Excel .xlsx / 75.265 baris)"]
        A2["🗺️ Data Spasial Batas Desa<br/>(Shapefile / FileGDB 339MB - 1GB+)"]
    end

    subgraph Pipeline["⚙️ PIPELINE DATA OFFLINE (tools/build_geo.py)"]
        B1["Ekstraksi & Penyelarasan Kunci Join<br/>(KODE_DESA 10-digit BPS / Kemendagri)"]
        B2["Penyederhanaan Geometri & Topologi<br/>(Ramer-Douglas-Peucker & Min-Area Ring)"]
        B3["Kuantisasi Koordinat & Delta Encoding<br/>(Presisi 10⁻⁵ Derajat ~ 1,1 meter)"]
        B4["Praperhitungan Agregasi Statistik & Histogram"]
    end

    subgraph StaticAssets["📦 KELUARAN ASET STATIS (Tanpa Database)"]
        C1["data/idm/meta.json<br/>(Agregat Nasional & 37 Provinsi)"]
        C2["data/idm/prov/*.json<br/>(37 Berkas Statistik Desa per Provinsi)"]
        C3["data/geo/prov.json & geo-out/<br/>(Vektor Terkuantisasi Kompresi Tinggi)"]
    end

    subgraph ClientRuntime["💻 SISI PENGGUNA / RUNTIME (Browser)"]
        D1["Dashboard IDM 2024.dc.html<br/>(Antarmuka Sadasa Design System)"]
        D2["Canvas & WebGL Renderer<br/>(60 FPS Pan, Zoom, Highlight, Hover)"]
        D3["Manajemen Status Dinamis<br/>(Drilldown, Multi-Filter, Cari, Ekspor)"]
    end

    A1 --> B1
    A2 --> B1
    B1 --> B2 --> B3 --> B4
    B4 --> C1
    B4 --> C2
    B3 --> C3
    C1 --> D1
    C2 --> D1
    C3 --> D2
    D1 <--> D2
    D1 <--> D3
```

---

## 📐 Spesifikasi Teknis Geometri

Skrip `tools/build_geo.py` dirancang khusus untuk membaca berkas biner *Shapefile* (`.shp`, `.dbf`, `.shx`) secara langsung menggunakan modul bawaan Python (`struct`, `json`, `math`), tanpa memerlukan dependensi GIS pihak ketiga:

### 1. Kuantisasi & Delta Encoding Koordinat
Koordinat derajat desimal (WGS 84 / EPSG:4326) dikonversi menjadi bilangan bulat diskret (*integer*) dengan faktor kuantisasi $Q = 100.000$:

$$X_q = \lfloor (Lon - Lon_{min}) \times 100.000 \rceil$$

$$Y_q = \lfloor (Lat - Lat_{min}) \times 100.000 \rceil$$

Titik-titik berurutan kemudian dihitung selisih nilainya (*Delta Encoding*):

$$\Delta X_i = X_{q, i} - X_{q, i-1}, \quad \Delta Y_i = Y_{q, i} - Y_{q, i-1}$$

Pendekatan ini menghasilkan deret bilangan bulat kecil yang sangat efisien saat dikompresi ke format JSON/Gzip, sehingga mampu memangkas ukuran payload hingga **lebih dari 85%** tanpa mengorbankan ketajaman visual peta.

### 2. Penyesuaian Pemekaran Wilayah di Papua
Pipeline ini menyertakan pemetaan relasi kode wilayah secara otomatis untuk mengakomodasi pemekaran **4 Daerah Otonom Baru (DOB) di Tanah Papua**, dengan menghubungkan 4 digit kode kabupaten BPS ke 2 digit kode provinsi terbaru:
* **Papua (91)**, **Papua Barat (92)**, **Papua Selatan (93)**, **Papua Tengah (94)**, **Papua Pegunungan (95)**, dan **Papua Barat Daya (96)**.

---

## 📁 Struktur Direktori

```
Visualisasi Indeks Desa Membangun 2024/
│
├── Dashboard IDM 2024.dc.html            # Aplikasi web dashboard utama (Single-Page Application)
├── PRD-Dashboard-GIS-IDM-2024.html       # Dokumen Spesifikasi Produk (PRD) interaktif
├── support.js                            # Runtime pendukung & pengurai komponen reaktif
│
├── data/                                 # Sumber data dan hasil komputasi terstruktur
│   ├── indeks-desa-membangun-2024.xlsx   # Berkas data mentah resmi IDM 2024 Kemendes PDTT
│   ├── rekap-indeks-desa-membangun.xlsx  # Berkas rekapitulasi data tingkat provinsi
│   ├── geo/
│   │   ├── manifest.json                 # Manifest ketersediaan layer data spasial
│   │   ├── prov.json                     # Geometri poligon 37 provinsi terkuantisasi
│   │   └── join-audit.json               # Laporan audit integritas data Excel-GeoJSON
│   └── idm/
│       ├── meta.json                     # Metadata agregat nasional, statistik provinsi, & histogram
│       └── prov/                         # 37 berkas JSON berisi data desa per provinsi
│           ├── 11.json (Aceh)
│           ├── 12.json (Sumatera Utara)
│           ├── ...
│           └── 96.json (Papua Barat Daya)
│
├── tools/                                # Utilitas pengolahan data & konversi geometri
│   ├── build_geo.py                      # Skrip konversi Shapefile ke vektor web (murni Python)
│   ├── audit_join.py                     # Skrip validasi integritas relasi Excel & GeoJSON
│   └── build_geo.bat                     # Skrip otomasi batch untuk Windows
│
├── _ds/                                  # Sistem Desain Sadasa Academy
│   └── sadasa-academy-design-system-.../ # Token CSS (Warna, Tipografi, Spasi, Animasi)
│
├── assets/                               # Media visual, ikon, dan logo
│   └── sadasa-mark-red.png
│
├── SHP GIS/                              # Dataset spasial master & referensi teknis GIS
│   ├── REFERENSI-DATASET-GIS-...md       # Laporan analisis komparasi 5 dataset batas Indonesia
│   ├── batas-administrasi-indonesia/     # Layer Shapefile batas administrasi
│   ├── RBI10K_ADMINISTRASI_DESA_...gdb   # Geodatabase batas desa skala 1:10.000 BIG
│   └── RBI50K_ADMINISTRASI_KABKOTA_..gdb # Geodatabase batas kab/kota skala 1:50.000 BIG
│
└── work/                                 # Area kerja data perantara (scratchpad TSV/JSON)
```

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

Aplikasi ini dirancang sebagai **Aplikasi Web Statis Tanpa Server (*Zero-Server Static App*)**. Anda tidak perlu memasang database (seperti MySQL atau PostgreSQL) ataupun mengonfigurasi backend server yang rumit.

### Opsi A: Menjalankan Langsung di Komputer Lokal (Paling Cepat)
1. **Klon repositori ini:**
   ```bash
   git clone https://github.com/username/visualisasi-idm-2024.git
   cd visualisasi-idm-2024
   ```
2. **Jalankan server web lokal** (langkah ini diperlukan agar peramban dapat membaca data JSON lokal dengan *fetch API*):
   * Menggunakan **Python** (umumnya sudah tersedia di komputer):
     ```bash
     python -m http.server 8000
     ```
   * Atau menggunakan **Node.js**:
     ```bash
     npx serve .
     ```
   * Atau menggunakan ekstensi **VS Code Live Server**: Klik kanan pada berkas `Dashboard IDM 2024.dc.html` $\rightarrow$ pilih *Open with Live Server*.
3. Buka browser dan kunjungi alamat:
   ```
   http://localhost:8000/Dashboard%20IDM%202024.dc.html
   ```

---

### Opsi B: Membangun Ulang Data Geometri Spasial (Opsional)
Jika Anda ingin memperbarui berkas Shapefile atau mengubah tingkat penyederhanaan poligon batas wilayah:
1. Pastikan Anda telah memasang Python 3.8 atau versi yang lebih baru (tidak memerlukan instalasi paket tambahan).
2. Jalankan perintah:
   ```bash
   python tools/build_geo.py
   ```
3. Opsi parameter yang tersedia:
   ```bash
   # Hanya memproses provinsi tertentu (misalnya: DIY & Jawa Tengah)
   python tools/build_geo.py --prov 34 33

   # Menyesuaikan toleransi penyederhanaan (default: 0.00035)
   python tools/build_geo.py --tol 0.0005 --target-kb 1500
   ```

---

### Opsi C: Mengaudit Relasi Data Excel–GeoJSON
Jalankan audit ini setelah memperbarui berkas Excel IDM atau membangun ulang geometri untuk memastikan konsistensi dan integritas data:

```bash
.venv\Scripts\python tools\audit_join.py --strict
```

Skrip audit akan mencocokkan kode wilayah 10 digit yang digunakan pada dashboard, memeriksa potensi duplikasi, serta memastikan keselarasan antara data Excel dan JSON. Hasil rincian per provinsi dan daftar desa tanpa poligon akan disimpan ke `data/geo/join-audit.json`. Wilayah berkode `1xxx` otomatis diklasifikasikan sebagai kelurahan (yang berada di luar cakupan evaluasi IDM).

**Catatan status data saat ini:**
* Total data IDM: **75.265 baris desa**
* Total fitur geometri: **83.398 poligon wilayah**
* Berhasil terhubung presisi (*exact match*): **74.930 desa**
* Desa tanpa poligon pada peta dasar RBI September 2023: **335 desa**
* Kelurahan di luar cakupan IDM: **8.468 wilayah**
* Desa tanpa catatan skor: **4 desa**
* Perbedaan penulisan nama pada kode yang sama: **3 desa**
* Poligon desa valid yang gagal terhubung: **0 (sempurna)**

---

## 🎨 Sistem Desain & Aksesibilitas

Dashboard ini mengimplementasikan prinsip desain editorial modern berbasis **Sadasa Academy Design System**:
* **Palet Warna Terukur:** Menggunakan kombinasi warna dengan rasio kontras data (*data-ink ratio*) yang optimal dan variasi saturasi yang pas, sehingga perbedaan antar status IDM terlihat tegas dan informatif.
* **Aksesibilitas & Keterbacaan:** Setiap indikator warna selalu dilengkapi teks label yang jelas pada tooltip, tabel, dan legenda. Pendekatan ini memastikan informasi tetap dapat dipahami dengan baik oleh pengguna dengan keterbatasan persepsi warna (*color blindness*).
* **Tipografi Presisi:** Memadukan font sans-serif modern yang nyaman dibaca untuk elemen antarmuka teks, serta font monospace dengan dukungan `tabular-nums` agar deret angka metrik tersusun sejajar dan rapi.
* **Tata Letak Responsif:** Tampilan antarmuka fleksibel dan otomatis menyesuaikan ukuran layar, mulai dari monitor desktop lebar hingga perangkat tablet dan layar sentuh.

---

## 📚 Sumber Data & Atribusi

* **Data Statistik IDM 2024:** Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi Republik Indonesia ([Kemendes PDTT](https://kemendesa.go.id)) melalui [Portal Satu Data Indonesia: Data Indeks Desa Membangun Tahun 2024](https://data.go.id/dataset/dataset/data-indeks-desa-membangun-tahun-2024).
* **Data Spasial Batas Administrasi:** Badan Informasi Geospasial ([BIG - Geoportal RBI](https://tanahair.indonesia.go.id)) & Direktorat Jenderal Bina Administrasi Kewilayahan Kementerian Dalam Negeri ([Kemendagri](https://kemendagri.go.id)).
* **Sistem Desain & Aset Visual:** [Sadasa Academy](https://sadasa.id).

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi **MIT License**. Anda bebas menggunakan, memodifikasi, dan menyebarluaskan kode ini untuk keperluan riset, akademik, jurnalisme data, maupun implementasi praktis lainnya dengan tetap menyertakan atribusi ke pengembang asli.

---

<div align="center">

**Dikembangkan dengan ❤️ untuk Kemajuan Desa dan Keterbukaan Data Indonesia.**

⭐ *Jika repositori ini bermanfaat untuk pekerjaan atau riset Anda, jangan ragu untuk memberikan bintang (Star) pada repositori ini!*

</div>
