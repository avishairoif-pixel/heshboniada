'use strict';

/**
 * Preload מינימלי ומאובטח.
 * חושף רק דגל "רצים בשולחן העבודה" — בלי גישה ל-Node מתוך המשחק.
 */

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('cheshboniada', {
  isDesktop: true,
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
  },
});
