@echo off
cd /d c:\Users\ASUS\Desktop\rn
node content-tools/fix-placeholders.js physics > fix-output.txt 2>&1
echo DONE >> fix-output.txt