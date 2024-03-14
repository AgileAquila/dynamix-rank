@echo off
setlocal enabledelayedexpansion

set "folder=D:\HTML5\Dynamix-Rank-Remake\song-bg\"
set "css-folder=D:\HTML5\Dynamix-Rank-Remake\style\"
set "output=%css-folder%\bg.css"

(echo off) > "%output%"

for %%f in ("%folder%*.webp") do (
	set "filename=%%~nf"
	set "css-class=#!filename!{"
	set "css-content=	background-image: url(../song-bg/!filename!.webp);"
	set "css-end=}"
      
	echo !css-class!>> "%output%"
	echo !css-content!>> "%output%"
	echo !css-end!>> "%output%"
	echo.>> "%output%"
)

echo CSS generation complete.