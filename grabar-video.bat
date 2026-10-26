@echo off
cd /d "%~dp0"
if exist test-results rmdir /s /q test-results
call npx playwright test video-pruebas.spec.ts
if not exist videos mkdir videos
for /r test-results %%f in (video.webm) do if exist "%%f" ffmpeg -y -i "%%f" -c:v libx264 -pix_fmt yuv420p videos\vela-mia-pruebas.mp4
echo Video listo en la carpeta videos
pause
