'use strict';

/**
 * החשבוניאדה — תהליך ראשי של Electron
 * טוען את המשחק מתוך תיקיית app/ (עותק של dist) דרך פרוטוקול app:// מאובטח,
 * כך שההתקדמות (localStorage) נשמרת בין הפעלות והמשחק עובד לגמרי אופליין.
 */

const { app, BrowserWindow, Menu, protocol, net, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');

const APP_ROOT = path.join(__dirname, 'app');
const START_URL = 'app://local/index.html';
const THEME_BG = '#25123d';

/* פרוטוקול פנימי מאובטח — נותן למשחק "מקור" יציב ל-localStorage */
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      codeCache: true,
    },
  },
]);

/** ממיר בקשת app:// לנתיב קובץ, עם הגנה מפני יציאה מהתיקייה */
function resolveAppFile(requestUrl) {
  let pathname;
  try {
    ({ pathname } = new URL(requestUrl));
  } catch {
    return null;
  }

  const decoded = decodeURIComponent(pathname);
  const relative = decoded === '/' || decoded === '' ? 'index.html' : decoded.replace(/^\/+/, '');
  const filePath = path.normalize(path.join(APP_ROOT, relative));

  if (filePath !== APP_ROOT && !filePath.startsWith(APP_ROOT + path.sep)) return null;
  return filePath;
}

function registerAppProtocol() {
  protocol.handle('app', async (request) => {
    const filePath = resolveAppFile(request.url);
    if (!filePath) return new Response('Forbidden', { status: 403 });

    try {
      return await net.fetch(pathToFileURL(filePath).toString());
    } catch {
      // כל נתיב לא מוכר מחזיר את המשחק עצמו (SPA)
      const fallback = path.join(APP_ROOT, 'index.html');
      if (fs.existsSync(fallback)) {
        return net.fetch(pathToFileURL(fallback).toString());
      }
      return new Response('Not found', { status: 404 });
    }
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 380,
    minHeight: 580,
    backgroundColor: THEME_BG,
    title: 'החשבוניאדה',
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      devTools: true,
    },
  });

  win.once('ready-to-show', () => {
    win.show();
    win.focus();
  });

  /* קיצורי מקלדת נוחים: F11 מסך מלא, Esc יציאה ממסך מלא, F12 כלי פיתוח */
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;

    if (input.key === 'F11') {
      event.preventDefault();
      win.setFullScreen(!win.isFullScreen());
      return;
    }
    if (input.key === 'Escape' && win.isFullScreen()) {
      event.preventDefault();
      win.setFullScreen(false);
      return;
    }
    if (input.key === 'F12') {
      event.preventDefault();
      win.webContents.toggleDevTools();
    }
  });

  /* קישורים חיצוניים ייפתחו בדפדפן, לא בתוך המשחק */
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });

  /* חסימת ניווט מחוץ לאפליקציה */
  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('app://')) event.preventDefault();
  });

  win.loadURL(START_URL);
  return win;
}

/* מופע יחיד — לחיצה נוספת על האייקון תמקד את החלון הקיים */
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const [win] = BrowserWindow.getAllWindows();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.setAppUserModelId('com.cheshboniada.game');

  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    registerAppProtocol();
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
