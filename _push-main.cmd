@echo off
cd /d C:\Users\ASUS\Desktop\rn
git add -A
git status -sb
git commit -m "feat(auth): remove R1; guest Go/signup/pending flow; owner direct login"
if errorlevel 1 (
  echo COMMIT_FAILED
  exit /b 1
)
git checkout main
if errorlevel 1 exit /b 1
git pull --ff-only origin main
if errorlevel 1 exit /b 1
git merge --ff-only feature/auth-flow-no-r1
if errorlevel 1 exit /b 1
git push origin main
if errorlevel 1 exit /b 1
git status -sb
git log -3 --oneline
