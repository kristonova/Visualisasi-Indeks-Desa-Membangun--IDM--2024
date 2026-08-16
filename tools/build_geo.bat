@echo off
REM Klik dua kali berkas ini untuk membangun geometri IDM 2024.
cd /d "%~dp0.."

if not exist ".venv\Scripts\python.exe" (
  echo Membuat .venv dan memasang pyogrio + shapely...
  where python >nul 2>nul || (echo Python tidak ditemukan. Pasang dari https://python.org lalu ulangi. & pause & exit /b)
  python -m venv .venv || (echo Gagal membuat .venv. & pause & exit /b)
  ".venv\Scripts\python.exe" -m pip install --upgrade pip
  ".venv\Scripts\python.exe" -m pip install pyogrio shapely || (echo Gagal memasang pustaka. & pause & exit /b)
)

".venv\Scripts\python.exe" tools\build_geo.py %*
echo.
echo Selesai. Folder hasil: data\geo
pause
