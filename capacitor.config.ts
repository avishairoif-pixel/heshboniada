import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cheshboniada.game',
  appName: 'החשבוניאדה',
  webDir: 'dist',
  backgroundColor: '#25123d',
  android: {
    allowMixedContent: false,
  },
};

export default config;
