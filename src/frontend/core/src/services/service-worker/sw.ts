// @ts-nocheck
/* eslint-disable */
const CACHE_NAME = 'app-cache-v1.0.0';

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response.
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const clonedResponse = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clonedResponse));

            return response;
          },
        );
      }),
  );
});
