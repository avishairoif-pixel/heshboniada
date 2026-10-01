# החשבוניאדה — מרוץ החשבון של שלומפר 🦄

משחק חשבון קסום לילדות כיתה ב' — עזרי לשלומפר החד-קרן לנצח במרוץ דרך 9 עולמות, 45 תחנות ו-225 שאלות חשבון. המשחק מיועד לעבודה מלאה אופליין, בעברית מלאה, מימין לשמאל.

---

## ✨ תכונות

- **9 עולמות** — ממלכת החשבון, חלל, פיראטים, מדע, פרחים, כימיה, גן חיות, רובוטים, וחדי קרן.
- **17 נושאי חשבון** — חיבור/חיסור עד 20, עשרות שלמות, זוגי/אי-זוגי, סדרות, ישר המספרים, בעיות מילוליות, חלקי שלם, ריבועים ומלבנים, מצולעים, ועוד.
- **3 רמות קושי** — כניסה (בלי שעון), בינוני (45 שניות), מומחה (35 שניות).
- **PWA** — ניתן להתקנה כאפליקציה אמיתית על Android/iOS, עובד אופליין.
- **Electron** — גרסת שולחן עבודה עצמאית ל-Windows/macOS/Linux.
- **Capacitor** — אפליקציית Android native.
- **RTL מלא** + נגישות (מקלדת, ARIA, ניווט).

---

## 🚀 התחלה מהירה

```bash
npm install      # התקנת תלות
npm run dev      # הרצת שרת פיתוח
npm run build    # בניית גרסת production ל-dist/
npm run preview  # תצוגה מקדימה של ה-build
npm test         # הרצת בדיקות יחידה
```

דרישות: Node.js 20+ ו-npm 10+.

---

## 📁 מבנה הפרויקט

```
heshboniada/
├── src/
│   ├── App.tsx                # רכיב ראשי — מסכים, overlays, ניווט
│   ├── main.tsx               # נקודת כניסה + רישום Service Worker
│   ├── index.css              # סגנונות גלובליים
│   ├── quest.css              # סגנונות מסך משחק/מפה/סיפור
│   ├── game/
│   │   ├── content.ts         # יצירת שאלות + הגדרות עולמות/נושאים/רמות
│   │   ├── storage.ts         # localStorage (התקדמות, שיאים, איפוס)
│   │   └── story.ts           # מתחרים, פרקי סיפור, סצנות
│   └── components/
│       ├── LevelPlay.tsx      # מסך השאלה: טיימר, לבבות, כוכבים, קסם
│       ├── WorldMap.tsx       # מפת המסע עם תחנות ושביל
│       ├── StoryScene.tsx     # סצנת סיפור מאוירת בין תחנות
│       ├── Story.tsx          # חלונות מתחרים ויומן מסע
│       ├── Bits.tsx           # רכיבי UI קטנים (כוכבים, לבבות, ניצוצות)
│       └── Install.tsx        # חלון התקנת PWA
├── public/
│   ├── sw.js                  # Service Worker — caching אופליין
│   ├── manifest.webmanifest   # PWA manifest
│   ├── icons/                 # אייקונים
│   └── images/                # מפות, דמויות, רקעים
├── desktop/                   # גרסת Electron
│   ├── main.cjs               # תהליך ראשי — חלון, פרוטוקול app://
│   ├── preload.cjs            # גשר מאובטח
│   └── prepare.mjs            # העתקת dist → app/
├── capacitor.config.ts        # הגדרות Capacitor ל-Android
├── vite.config.ts             # Vite + React + viteSingleFile
├── tsconfig.json              # TypeScript strict
└── .github/workflows/         # CI: GitHub Pages + Android APK
```

---

## 📲 ערוצי הפצה

### Web / PWA
הפריסה אוטומטית ל-GitHub Pages דרך `.github/workflows/deploy-pages.yml`. אחרי `npm run build`, תיקיית `dist/` מכילה אפליקציית קובץ יחיד מוכנה לאחסון על כל שרת HTTPS.

### Android
ראה [ANDROID.md](./ANDROID.md) להוראות מלאות. בקיצור:

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

### שולחן עבודה (Electron)
ראה [DESKTOP.md](./DESKTOP.md). בקיצור:

```bash
npm run build
cd desktop && npm install
npm run dist          # Windows EXE
npm run dist:mac      # macOS DMG
npm run dist:linux    # Linux AppImage
```

---

## 🧪 בדיקות

```bash
npm test
```

בדיקות יחידה מכסות את לוגיקת יצירת השאלות (`createQuestion`, `numberOptions`, `uniqueOptions`), חישוב כוכבים (`starsForCorrect`), וניהול התקדמות (`isUnlocked`, `currentLevelId`).

---

## ♿ נגישות

- **מקלדת** — 1-4 לבחירת תשובה, Enter לאישור, P להשהיה, חצים לניווט במפה, Esc לסגירה.
- **ARIA** — כל חלון מסומן `role="dialog" aria-modal="true"` עם `aria-label` מתאים.
- **RTL** — `dir="rtl"` בכל המסכים, מחרוזות עבריות, `toLocaleString('he-IL')`.
- **תנועה מופחתת** — `prefers-reduced-motion` מכבה אנימציות וזיקוקים למשתמשים רגישים.

---

## 🔒 אבטחה

- **Electron**: `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`, פרוטוקול `app://` עם הגנה מפני path traversal, DevTools פתוח רק בפיתוח.
- **Service Worker**: טעינה מקומית בלבד (origin check), אסטרטגיית cache-first לנכסים ו-network-first לניווטים.
- **PWA**: HTTPS בלבד, scope מוגבל ל-`./`.

---

## 🛠️ טכנולוגיות

| תחום | טכנולוגיה |
|------|-----------|
| Frontend | React 19, TypeScript 5.9 (strict) |
| Build | Vite 7 + vite-plugin-singlefile |
| Mobile | Capacitor 8 |
| Desktop | Electron 33 + electron-builder 25 |
| Tests | Vitest 2 |
| PWA | Service Worker + Web App Manifest |

---

## 📝 רישיון

UNLICENSED — פרויקט פרטי.
