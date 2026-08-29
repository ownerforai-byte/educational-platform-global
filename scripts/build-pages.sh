#!/bin/bash
set -e

echo "Building frontend..."
cd frontend
npm run build

echo "Preparing Pages output (excluding cache)..."
mkdir -p ../.pages-output
cp -r .next/static/* ../.pages-output/ 2>/dev/null || true
cp -r public/* ../.pages-output/ 2>/dev/null || true

echo "Build complete. Output in .pages-output/"
