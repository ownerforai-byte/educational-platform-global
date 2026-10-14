@echo off
setlocal
if not defined ANDROID_HOME set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
if not defined ANDROID_SDK_ROOT set "ANDROID_SDK_ROOT=%ANDROID_HOME%"
set "SDKMANAGER=%ANDROID_HOME%\cmdline-tools\latest\bin\sdkmanager.bat"
if not exist "%SDKMANAGER%" (
  echo sdkmanager not found at "%SDKMANAGER%". Install Android command-line tools first.
  exit /b 1
)
echo y | call "%SDKMANAGER%" --licenses
if errorlevel 1 exit /b %ERRORLEVEL%
echo y | call "%SDKMANAGER%" "build-tools;35.0.0" "platforms;android-36" "platform-tools"
exit /b %ERRORLEVEL%
