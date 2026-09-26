@echo off
REM Klik dua kali berkas ini untuk membangun data IDM (2023 & 2024) lalu geometrinya.
cd /d "%~dp0.."

if not exist ".venv\Scripts\python.exe" (
  echo Membuat .venv dan memasang pyogrio + shapely + openpyxl...
  where python >nul 2>nul || (echo Python tidak ditemukan. Pasang dari https://python.org lalu ulangi. & pause & exit /b)
  python -m venv .venv || (echo Gagal membuat .venv. & pause & exit /b)
  ".venv\Scripts\python.exe" -m pip install --upgrade pip
  ".venv\Scripts\python.exe" -m pip install pyogrio shapely openpyxl || (echo Gagal memasang pustaka. & pause & exit /b)
)

REM build_geo.py membaca daftar kode desa dari data\idm\TAHUN\ untuk tambalan poligon,
REM jadi data IDM dibangun lebih dulu, lalu hasilnya diaudit per tahun.
".venv\Scripts\python.exe" tools\build_idm.py || (echo Gagal membangun data IDM. & pause & exit /b)
".venv\Scripts\python.exe" tools\build_geo.py %*
".venv\Scripts\python.exe" tools\audit_join.py --year 2023
".venv\Scripts\python.exe" tools\audit_join.py --year 2024
echo.
echo Selesai. Folder hasil: data\idm dan data\geo
pause
