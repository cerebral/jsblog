import { STATIC_CACHE, PAGES_CACHE } from './caches';

function onFetch(event) {
  const request = event.request;

  // Ignore not GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`);
    }
    return;
  }

  const requestUrl = new URL(request.url);
  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (DEBUG) {
      console.log(`[SW] Ignore difference origin ${requestUrl.origin}`);
    }
    return;
  }

  const resource = global.caches.match(request).then(response => {
    if (response) {
      if (DEBUG) {
        console.log(`[SW] Cache hit on ${requestUrl.href}`);
      }

      return response;
    }

    return (
      response ||
      fetch(request.clone()).then(response => {
        if (DEBUG) {
          console.log(
            `[SW] Fetched new version of ${requestUrl.href}, putting in cache`
          );
        }

        const cachedResponse = response.clone();

        global.caches
          .open(requestUrl.href.match(/\.js$/) ? STATIC_CACHE : PAGES_CACHE)
          .then(cache => {
            return cache.put(request, cachedResponse);
          });

        return response;
      })
    );
  });

  event.respondWith(resource);
}

export default onFetch;
