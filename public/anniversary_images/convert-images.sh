#!/usr/bin/env bash
cd public/anniversary_images || exit 1

# Restore extensions, convert, then clean up:
for f in *.JPG; do mv "$f" "${f%.JPG}.HEIC"; done
for f in *.HEIC; do heif-convert "$f" "${f%.HEIC}.jpg"; heif-convert "$f" "${f%.HEIC}.webp"; done
rm *.HEIC

echo "✅ All anniversary_images are now real JPG & WebP."
