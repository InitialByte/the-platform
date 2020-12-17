// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.

const version = new URL(self.location).searchParams.get('v') || 1;
const PRECACHE = 'precache-v' + Number(version);
const RUNTIME = 'runtime-v' + Number(version);
const maxAgeSeconds = 30 * 24 * 60 * 600; // ~7.2 hours

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  '/i18n/root/en_us.json',
  '/i18n/root/ru_ru.json',
  '/i18n/auth/en_us.json',
  '/i18n/auth/ru_ru.json',
  'manifest.webmanifest',
  'favicon.ico',
  '/i/192.png',
  '/i/512.png',
  'index.html',
  'stub.js',
  '/',
];

const isValid = (response) => {
  if (!response) {
    return false;
  }

  const fetched = response.headers.get('sw-fetched-on');

  return (
    !fetched ||
    (fetched && parseFloat(fetched) + maxAgeSeconds > new Date().getTime())
  );
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()),
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        cacheNames.filter((cacheName) => !currentCaches.includes(cacheName)),
      )
      .then((cachesToDelete) =>
        Promise.all(
          cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Cache hit - return cached response.
        if (isValid(response)) {
          console.log('SW Cache HIT', event.request.url);
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response.
          if (
            !response ||
            response.status !== 200 ||
            response?.type !== 'basic' ||
            !['image', 'script', 'style', 'manifest', 'font'].includes(
              event.request.destination,
            )
          ) {
            return response;
          }

          const clonedResponse = response.clone();
          event.waitUntil(
            caches.open(RUNTIME).then((cache) => {
              const headers = new Headers(clonedResponse.headers);

              headers.append('sw-fetched-on', new Date().getTime());

              return clonedResponse.blob().then((body) =>
                cache.put(
                  event.request,
                  new Response(body, {
                    status: clonedResponse.status,
                    statusText: clonedResponse.statusText,
                    headers,
                  }),
                ),
              );
            }),
          );

          return response;
        });
      }),
    );
  }
});
