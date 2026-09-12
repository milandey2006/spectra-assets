@echo off
REM ── Start the Spectra Assets website (Next.js dev server) ──
REM Double-click this file, then open http://localhost:3000 in your browser.
setlocal
set "PATH=C:\Users\HP\nodejs\node-v24.20.0-win-x64;%PATH%"
cd /d "%~dp0"
if not exist "node_modules" (
  echo Installing dependencies for the first time...
  call npm install --no-audit --no-fund
)
echo.
echo Starting Spectra Assets at http://localhost:3000  (press Ctrl+C to stop)
echo.
call npm run dev
pause
