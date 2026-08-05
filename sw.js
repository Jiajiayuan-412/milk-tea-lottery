const CACHE_NAME = 'milktea-v3';
const ASSETS = [
  '/milk-tea-lottery/milk-tea-lottery.html',
  '/milk-tea-lottery/manifest.json',
  '/milk-tea-lottery/icons/icon-192.png',
  '/milk-tea-lottery/icons/icon-512.png',
  '/milk-tea-lottery/logos/heytea.png',
  '/milk-tea-lottery/logos/nayuki.jpeg',
  '/milk-tea-lottery/logos/chagee.png',
  '/milk-tea-lottery/logos/sexytea.png',
  '/milk-tea-lottery/logos/mollytea.jpg',
  '/milk-tea-lottery/logos/ahma.png',
  '/milk-tea-lottery/logos/noyeye.jpg',
  '/milk-tea-lottery/logos/guming.jpeg',
  '/milk-tea-lottery/logos/mixue.jpeg',
  '/milk-tea-lottery/logos/chabaidao.png',
  '/milk-tea-lottery/logos/hushang.jpeg',
  '/milk-tea-lottery/logos/shuyi.jpeg',
  '/milk-tea-lottery/logos/coco.jpeg',
  '/milk-tea-lottery/logos/yidiandian.jpeg',
  '/milk-tea-lottery/logos/yihetang.jpeg',
  '/milk-tea-lottery/logos/ningji.jpeg',
  '/milk-tea-lottery/logos/linlee.jpg',
  '/milk-tea-lottery/logos/luckin.png',
  '/milk-tea-lottery/logos/teasure.jpeg',
  '/milk-tea-lottery/logos/moreyogurt.jpeg',
  '/milk-tea-lottery/logos/funhosa.jpeg',
  '/milk-tea-lottery/logos/starbucks.jpeg',
  '/milk-tea-lottery/logos/qintiantian.jpeg',
  '/milk-tea-lottery/logos/lelecha.jpeg'
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); }))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
