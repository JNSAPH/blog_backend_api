@echo off

REM Check if the image exists
docker inspect aphBlog_wDMePj22 > nul 2>&1
if %errorlevel% equ 0 (
    REM Delete the existing image
    docker rmi aphBlog_wDMePj22
)

REM Build the image
docker build -t aphBlog_wDMePj22 .

REM Check if the image was created
echo Current images:
docker images
