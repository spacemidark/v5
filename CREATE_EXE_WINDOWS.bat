@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo  INSIDE THE JET ENGINE - WINDOWS EXE OLUSTUR
echo ================================================
where node >nul 2>nul
if errorlevel 1 (
  echo HATA: Node.js kurulu degil veya PATH'de bulunamadi.
  echo https://nodejs.org/ adresinden Node.js LTS kurun.
  pause
  exit /b 1
)
echo [1/3] Kutuphaneler yukleniyor...
call npm.cmd install
if errorlevel 1 goto fail
echo [2/3] React + TypeScript derleniyor...
call npm.cmd run build
if errorlevel 1 goto fail
echo [3/3] Windows EXE dosyalari hazirlaniyor...
call npx.cmd electron-builder --win --x64
if errorlevel 1 goto fail
echo.
echo TAMAMLANDI! Dosyalar release klasorunde.
start "" "%~dp0release"
pause
exit /b 0
:fail
echo.
echo ISLEM TAMAMLANAMADI. Yukaridaki hata mesajinin ekran goruntusunu gonderebilirsiniz.
pause
exit /b 1
