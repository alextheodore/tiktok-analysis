@echo off
echo ==========================================
echo   TikTok Insight Analyzer - DEPLOY KEY
echo ==========================================
echo.
echo Stopping any existing containers...
docker-compose down

echo.
echo Building and Starting Production Containers...
docker-compose up --build -d

echo.
echo ==========================================
echo   DEPLOYMENT COMPLETE!
echo ==========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Admin User: admin@tiktokpro.com / admin123
echo.
pause
