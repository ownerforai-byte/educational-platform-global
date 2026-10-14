@echo off
setlocal
if not defined ANDROID_HOME set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
if not defined ANDROID_SDK_ROOT set "ANDROID_SDK_ROOT=%ANDROID_HOME%"
pushd "%~dp0android" || exit /b 1
call gradlew.bat --no-daemon assembleDebug > "%~dp0build.log" 2>&1
set "GRADLE_EXIT=%ERRORLEVEL%"
popd
echo GRADLE_EXIT=%GRADLE_EXIT% > "%~dp0build-exit.txt"
exit /b %GRADLE_EXIT%
