#!/usr/bin/env bash
# Re-OCR the three NEB Class 11 "Old is Gold" (Asmita) scans at native 342 DPI
# into backend/.ocr-v2. Resumable: finished page files are skipped.
set -u
cd "$(dirname "$0")/.." || exit 1   # backend/

PY="/c/Users/ASUS/AppData/Local/Programs/Python/Python311/python"
DL="/c/Users/ASUS/Downloads"
OUT=".ocr-v2"

run() {
  local subject="$1" pdf="$2" log="$3"
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') START $subject ===" >> "$log"
  PYTHONIOENCODING=utf-8 "$PY" scripts/ocr-scanned-books.py \
    --pdf "$DL/$pdf" \
    --subject "$subject" \
    --class 11 \
    --dpi 342 \
    --out "$OUT" >> "$log" 2>&1
  local rc=$?
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') EXIT $subject rc=$rc ===" >> "$log"
}

run physics     "NEB Solution of PHYSICS (Class 11) Old is Gold Question Bank Asmita Publication.pdf"     .ocr-v2-physics.log
run mathematics "NEB Solution of Mathematics (Class 11) Old is Gold Question Bank Asmita Publication.pdf" .ocr-v2-mathematics.log
run chemistry   "NEB Solution of CHEMISTRY (Class 11) Old is Gold Question Bank Asmita Publication.pdf"  .ocr-v2-chemistry.log

echo "=== $(date '+%Y-%m-%d %H:%M:%S') ALL DONE ===" >> .ocr-v2-all.log
