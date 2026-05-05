@echo off
title EV-Hub Integrated Launcher
echo Starting EV-Hub Backend and Frontend...

:: Set Environment Variables for Backend
set MONGO_URL=mongodb+srv://mangohacakathon:YopEADuplW6EJ0mO@mycluster.pr86r16.mongodb.net/?appName=mycluster
set DB_NAME=ev_platform
set JWT_SECRET=ev_super_secret_key_2024_replace_this
set JWT_EXPIRE_MINUTES=60

:: Start Backend in a new window
echo Starting FastAPI Backend...
start "EV Backend" cmd /c "cd /d c:\Users\sn740\ev-backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000"

:: Start Frontend in a new window
echo Starting Vite Frontend...
start "EV Frontend" cmd /c "cd /d c:\Users\sn740\Downloads\draft\draft && npm run dev"

:: Open Browser
timeout /t 5 /nobreak >nul
echo Opening Browser...
start http://localhost:5173/

echo EV-Hub is running! You can close this window.
pause
