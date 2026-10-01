/**
 * מכין את גרסת השולחן:
 * 1. מעתיק את תוצרי הבנייה (../dist) אל desktop/app
 * 2. מעתיק את אייקון האפליקציה אל desktop/build/icon.png
 *
 * הרצה: npm run prepare-app   (רץ אוטומטית לפני start / dist)
 */

import { cp, mkdir, rm, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

const DIST = path.join(ROOT, 'dist');
const APP_OUT = path.join(HERE, 'app');
const ICON_SRC = path.join(ROOT, 'public', 'icons', 'app-icon-512.png');
const BUILD_DIR = path.join(HERE, 'build');
const ICON_OUT = path.join(BUILD_DIR, 'icon.png');

async function exists(target) {
  try {
    await access(target, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(DIST))) {
    console.error('\n❌ לא נמצאה תיקיית dist.');
    console.error('   הריצי קודם בתיקייה הראשית:  npm run build\n');
    process.exit(1);
  }

  if (!(await exists(path.join(DIST, 'index.html')))) {
    console.error('\n❌ חסר dist/index.html — נסי לבנות מחדש:  npm run build\n');
    process.exit(1);
  }

  await rm(APP_OUT, { recursive: true, force: true });
  await cp(DIST, APP_OUT, { recursive: true });
  console.log('✅ הועתק dist →  desktop/app');

  // ה-Service Worker מיותר בגרסת השולחן (הכל כבר מקומי)
  await rm(path.join(APP_OUT, 'sw.js'), { force: true });

  await mkdir(BUILD_DIR, { recursive: true });
  if (await exists(ICON_SRC)) {
    await cp(ICON_SRC, ICON_OUT);
    console.log('✅ הועתק אייקון →  desktop/build/icon.png');
  } else {
    console.warn('⚠️  לא נמצא אייקון — ייעשה שימוש באייקון ברירת המחדל של Electron');
  }

  console.log('\n🦄 הכל מוכן! אפשר להריץ:  npm start   או   npm run dist\n');
}

main().catch((error) => {
  console.error('❌ ההכנה נכשלה:', error);
  process.exit(1);
});
