<#
    watch_geo.ps1 - pantau progres tools\build_geo.py secara live.

    Membaca data\geo\manifest.json, yang ditulis ulang oleh build_geo.py
    setiap satu provinsi selesai. Jadi ini akurat walaupun stdout Python
    sedang ter-buffer.

    Pakai (dari akar project):
        powershell -ExecutionPolicy Bypass -File tools\watch_geo.ps1

    Opsi:
        -Out geo-out        pantau folder keluaran lain
        -Interval 5         jeda polling, detik (default 3)

    Tekan Ctrl+C untuk berhenti memantau (build tetap jalan).

    CATATAN: berkas ini sengaja ASCII saja. Windows PowerShell 5.1 membaca
    .ps1 tanpa BOM sebagai Windows-1252, dan em-dash UTF-8 pecah jadi
    "a EUR "" - karakter terakhirnya U+201D, yang diperlakukan PowerShell
    sebagai tanda kutip penutup dan merusak parsing seluruh berkas.
#>
param(
    [string] $Out      = "data\geo",
    [int]    $Interval = 3,
    [int]    $Total    = 38
)

$ErrorActionPreference = "SilentlyContinue"

$root = Split-Path -Parent $PSScriptRoot
if (-not [System.IO.Path]::IsPathRooted($Out)) { $Out = Join-Path $root $Out }
$manifest = Join-Path $Out "manifest.json"

$ALL = @('11','12','13','14','15','16','17','18','19','21','31','32','33','34','35','36',
         '51','52','53','61','62','63','64','65','71','72','73','74','75','76','81','82',
         '91','92','93','94','95','96')
$NAMA = @{
    '11'='Aceh';'12'='Sumatera Utara';'13'='Sumatera Barat';'14'='Riau';'15'='Jambi'
    '16'='Sumatera Selatan';'17'='Bengkulu';'18'='Lampung';'19'='Kep. Bangka Belitung'
    '21'='Kepulauan Riau';'31'='DKI Jakarta';'32'='Jawa Barat';'33'='Jawa Tengah'
    '34'='DI Yogyakarta';'35'='Jawa Timur';'36'='Banten';'51'='Bali';'52'='Nusa Tenggara Barat'
    '53'='Nusa Tenggara Timur';'61'='Kalimantan Barat';'62'='Kalimantan Tengah'
    '63'='Kalimantan Selatan';'64'='Kalimantan Timur';'65'='Kalimantan Utara'
    '71'='Sulawesi Utara';'72'='Sulawesi Tengah';'73'='Sulawesi Selatan'
    '74'='Sulawesi Tenggara';'75'='Gorontalo';'76'='Sulawesi Barat';'81'='Maluku'
    '82'='Maluku Utara';'91'='Papua';'92'='Papua Barat';'93'='Papua Selatan'
    '94'='Papua Tengah';'95'='Papua Pegunungan';'96'='Papua Barat Daya'
}

function Get-Mb ($dir) {
    if (-not (Test-Path $dir)) { return 0 }
    $s = (Get-ChildItem $dir -Filter *.json | Measure-Object -Property Length -Sum).Sum
    if ($null -eq $s) { return 0 }
    return [math]::Round($s / 1MB, 1)
}

function Bar ($done, $total, $width) {
    if ($total -le 0) { return "" }
    $n = [math]::Floor($width * $done / $total)
    if ($n -gt $width) { $n = $width }
    return ("#" * $n) + ("." * ($width - $n))
}

Write-Host ""
Write-Host "Memantau : $Out" -ForegroundColor Cyan
Write-Host "Target   : $Total provinsi x 3 level (desa, kec, kab)" -ForegroundColor Cyan
Write-Host "Ctrl+C untuk berhenti memantau. Build tetap berjalan." -ForegroundColor DarkGray
Write-Host ""

$mulai    = Get-Date
$awal     = -1
$terakhir = ""

while ($true) {
    $desa = @(); $kec = @(); $kab = @()
    if (Test-Path $manifest) {
        try {
            $m = Get-Content $manifest -Raw | ConvertFrom-Json
            if ($m.desa) { $desa = @($m.desa) }
            if ($m.kec)  { $kec  = @($m.kec)  }
            if ($m.kab)  { $kab  = @($m.kab)  }
        } catch { }
    }

    if ($awal -lt 0) { $awal = $desa.Count }

    $mbD = Get-Mb (Join-Path $Out "desa")
    $mbC = Get-Mb (Join-Path $Out "kec")
    $mbK = Get-Mb (Join-Path $Out "kab")

    $elapsed = (Get-Date) - $mulai
    $baru    = $desa.Count - $awal
    $eta     = "?"
    if ($baru -gt 0) {
        $perProv = $elapsed.TotalSeconds / $baru
        $sisa    = [math]::Max(0, $Total - $desa.Count)
        $eta     = [TimeSpan]::FromSeconds($perProv * $sisa).ToString("hh\:mm\:ss")
    }

    # provinsi yang sedang dikerjakan = yang pertama belum ada di manifest
    $now = ""
    foreach ($p in $ALL) {
        if ($desa -notcontains $p) { $now = $p; break }
    }
    $label = "selesai semua"
    if ($now -ne "") {
        $label = "$now $($NAMA[$now])"
        if ($terakhir -ne $now) {
            if ($terakhir -ne "") {
                $sel = ($desa | Select-Object -Last 1)
                if ($sel) { Write-Host ("`r  + {0} {1}                                        " -f $sel, $NAMA["$sel"]) -ForegroundColor DarkGreen }
            }
            $terakhir = $now
        }
    }

    $fmt  = "`r[{0}] {1,2}/{2} desa  kec {3,2}  kab {4,2}  |  {5} MB  |  {6}  ETA {7}  |  {8}    "
    $line = $fmt -f (Bar $desa.Count $Total 24), $desa.Count, $Total, $kec.Count, $kab.Count, ($mbD + $mbC + $mbK), $elapsed.ToString("hh\:mm\:ss"), $eta, $label
    Write-Host $line -NoNewline

    if ($desa.Count -ge $Total -and $kec.Count -ge $Total -and $kab.Count -ge $Total) {
        Write-Host ""
        Write-Host ""
        Write-Host "Selesai. desa $mbD MB | kec $mbC MB | kab $mbK MB" -ForegroundColor Green
        Write-Host "Reload dashboard untuk melihat peta desa aktif." -ForegroundColor Green
        break
    }

    Start-Sleep -Seconds $Interval
}
