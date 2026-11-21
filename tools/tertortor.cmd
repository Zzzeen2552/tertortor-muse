@echo off
rem TERTORTOR launcher (desktop shortcut target): (re)start the Studio server so it runs the latest code, then open it.
cd /d "%~dp0.."
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 4341 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; if ($p -and $p.ProcessName -eq 'node') { Stop-Process -Id $p.Id -Force } }"
start "TERTORTOR MUSE server" /min cmd /k "npm run studio"
timeout /t 3 /nobreak >nul
start "" http://localhost:4341