#!/usr/bin/env bash
# בניית החשבוניאדה לאפליקציית שולחן — macOS / Linux
set -e

cd "$(dirname "$0")"

echo ""
echo "============================================"
echo "   בונה את החשבוניאדה לאפליקציית שולחן"
echo "============================================"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "[שגיאה] Node.js לא מותקן. התקיני מ- https://nodejs.org"
  exit 1
fi

echo "[1/4] מתקין ספריות של המשחק..."
npm install

echo ""
echo "[2/4] בונה את המשחק..."
npm run build

echo ""
echo "[3/4] מתקין את Electron (עלול לקחת כמה דקות בפעם הראשונה)..."
cd desktop
npm install

echo ""
echo "[4/4] יוצר את קובץ ההתקנה..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  npm run dist:mac
else
  npm run dist:linux
fi

echo ""
echo "============================================"
echo "   הצליח! הקבצים מוכנים בתיקייה:"
echo "   $(pwd)/release"
echo "============================================"
echo ""
