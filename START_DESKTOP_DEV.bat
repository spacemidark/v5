@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js LTS kurmaniz gerekiyor: https://nodejs.org/
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Ilk kurulum: npm paketleri indiriliyor...
  call npm.cmd install
  if errorlevel 1 goto fail
)
echo Inside the Jet Engine masaustu gelistirme modu aciliyor...
call npm.cmd run desktop:dev
if errorlevel 1 goto fail
exit /b 0
:fail
echo Islem basarisiz oldu. Hatayi kontrol edin.
pause
exit /b 1
