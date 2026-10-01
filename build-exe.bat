@echo off
chcp 65001 >nul
title בניית החשבוניאדה - קובץ EXE

echo.
echo ============================================
echo    בונה את החשבוניאדה לקובץ EXE
echo ============================================
echo.

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [שגיאה] Node.js לא מותקן במחשב.
  echo.
  echo התקיני אותו מהכתובת:  https://nodejs.org
  echo ואז הריצי את הקובץ הזה שוב.
  echo.
  pause
  exit /b 1
)

echo [1/4] מתקין ספריות של המשחק...
call npm install
if errorlevel 1 goto failed

echo.
echo [2/4] בונה את המשחק...
call npm run build
if errorlevel 1 goto failed

echo.
echo [3/4] מתקין את Electron (עלול לקחת כמה דקות בפעם הראשונה)...
cd desktop
call npm install
if errorlevel 1 goto failed

echo.
echo [4/4] יוצר את קובץ ה-EXE...
call npm run dist
if errorlevel 1 goto failed

echo.
echo ============================================
echo    הצליח! הקבצים מוכנים כאן:
echo    %~dp0desktop\release
echo ============================================
echo.
echo    Cheshboniada-Setup-1.0.0.exe     = מתקין
echo    Cheshboniada-Portable-1.0.0.exe  = הפעלה ישירה
echo.

start "" "%~dp0desktop\release"
pause
exit /b 0

:failed
echo.
echo ============================================
echo    הבנייה נכשלה. גללי למעלה לראות את השגיאה.
echo ============================================
echo.
pause
exit /b 1
