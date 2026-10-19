@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo =============================================
echo      INSIDE THE JET ENGINE - DEV SERVER
 echo =============================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is missing. Install the current LTS version from nodejs.org
  pause
  exit /b 1
)
if not exist node_modules\vite (
  echo Installing dependencies (internet required for first run)...
  call npm.cmd install
  if errorlevel 1 (
    echo Install failed. See README_TR.md
    pause
    exit /b 1
  )
)
echo Opening local development server...
echo Visit the localhost address shown below.
call npm.cmd run dev
pause
