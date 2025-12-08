@echo off
REM Video compression script for Windows
REM Requires FFmpeg to be installed

echo Video Compression Script
echo ========================
echo.

REM Check if ffmpeg is available
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: FFmpeg is not installed or not in PATH!
    echo.
    echo Install FFmpeg:
    echo   1. Download from https://ffmpeg.org/download.html
    echo   2. Extract and add to PATH
    echo   3. Or use: choco install ffmpeg
    echo.
    pause
    exit /b 1
)

echo [OK] FFmpeg found
echo.

REM Compress home video
if exist "assets\videos\home.mp4" (
    echo Compressing home.mp4...
    ffmpeg -i "assets\videos\home.mp4" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart -y "assets\videos\home-optimized.mp4"
    echo [OK] home.mp4 compressed
    echo.
)

REM Compress project videos
for %%V in (
    "Aqwan.mp4"
    "Asr-herfa.mp4"
    "Camel.mp4"
    "Emara.mp4"
    "Kendy.mp4"
    "Qshla.mp4"
    "Rally.mp4"
    "Sor.mp4"
    "Tadawl.mp4"
    "Zaabal.mp4"
    "Zeein.mp4"
) do (
    if exist "assets\videos\%%V" (
        echo Compressing %%V...
        set "output=%%V"
        set "output=!output:.mp4=-optimized.mp4!"
        ffmpeg -i "assets\videos\%%V" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart -y "assets\videos\!output!"
        echo [OK] %%V compressed
        echo.
    )
)

echo ========================
echo Compression complete!
echo ========================
echo.
echo Next steps:
echo 1. Test the optimized videos
echo 2. Update video references in code
echo 3. Upload to server
echo.
pause



