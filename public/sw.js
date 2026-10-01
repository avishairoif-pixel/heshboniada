/* החשבוניאדה — Service Worker לאפליקציה מותקנת + עבודה אופליין */
const CACHE = 'cheshboniada-v8';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/app-icon-512.png',
  /* מפות העולם */
  './images/magic-map.jpg',
  './images/space-map.jpg',
  './images/pirates-map.jpg',
  './images/science-map.jpg',
  './images/flowers-map.jpg',
  './images/potion-map.jpg',
  './images/zoo-map.jpg',
  './images/robots-map.jpg',
  './images/unicorns-map.jpg',
  /* רקעי סצנות סיפור */
  './images/race-hero.jpg',
  './images/story-forest.jpg',
  './images/story-crystal.jpg',
  /* דמויות ארץ החשבון */
  './images/racers/shlomper.jpg',
  './images/racers/tzviki.jpg',
  './images/racers/mira.jpg',
  './images/racers/shoki.jpg',
  './images/racers/dobi.jpg',
  /* תמונות קבוצה מלאות */
  './images/cast-space-full.png',
  './images/cast-pirates-full.png',
  './images/cast-science-full.png',
  './images/cast-flowers-full.png',
  './images/cast-potion-full.png',
  './images/cast-zoo-full.png',
  './images/cast-robots-full.png',
  './images/cast-unicorns-full.png',
  /* דמויות בודדות — חלל */
  './images/cast-space-0.png',
  './images/cast-space-1.png',
  './images/cast-space-2.png',
  './images/cast-space-3.png',
  './images/cast-space-4.png',
  /* דמויות בודדות — אוצר */
  './images/cast-pirates-0.png',
  './images/cast-pirates-1.png',
  './images/cast-pirates-2.png',
  './images/cast-pirates-3.png',
  './images/cast-pirates-4.png',
  /* דמויות בודדות — מדע */
  './images/cast-science-0.png',
  './images/cast-science-1.png',
  './images/cast-science-2.png',
  './images/cast-science-3.png',
  './images/cast-science-4.png',
  /* דמויות בודדות — פרחים */
  './images/cast-flowers-0.png',
  './images/cast-flowers-1.png',
  './images/cast-flowers-2.png',
  './images/cast-flowers-3.png',
  './images/cast-flowers-4.png',
  /* דמויות בודדות — כימיה */
  './images/cast-potion-0.png',
  './images/cast-potion-1.png',
  './images/cast-potion-2.png',
  './images/cast-potion-3.png',
  './images/cast-potion-4.png',
  /* דמויות בודדות — גן חיות */
  './images/cast-zoo-0.png',
  './images/cast-zoo-1.png',
  './images/cast-zoo-2.png',
  './images/cast-zoo-3.png',
  './images/cast-zoo-4.png',
  /* דמויות בודדות — רובוטים */
  './images/cast-robots-0.png',
  './images/cast-robots-1.png',
  './images/cast-robots-2.png',
  './images/cast-robots-3.png',
  './images/cast-robots-4.png',
  /* דמויות בודדות — חדי קרן */
  './images/cast-unicorns-0.png',
  './images/cast-unicorns-1.png',
  './images/cast-unicorns-2.png',
  './images/cast-unicorns-3.png',
  './images/cast-unicorns-4.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        // Promise.allSettled — אם קובץ אחד חסר, השאר עדיין נשמרים וה-SW נרשם בהצלחה
        Promise.allSettled(CORE.map((url) => cache.add(url).catch(() => undefined))).then(() =>
          self.skipWaiting(),
        ),
      ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // ניווטים: קודם רשת, ואם אין — דף הבית מהמטמון (עובד אופליין)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html')),
    );
    return;
  }

  // קבצים: קודם מטמון, ואם אין — רשת + שמירה למטמון
  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return res;
        }),
    ),
  );
});
