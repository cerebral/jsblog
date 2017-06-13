import { PAGES_CACHE } from './caches';

function message(event) {
  const message = JSON.parse(event.data);

  switch (message.type) {
    /*
    case 'skipWaiting':
      if (self.skipWaiting) {
        self.skipWaiting();
        self.clients.claim();
      }
      break;
    */
    case 'reset':
      if (DEBUG) {
        console.log('[SW] Cache has been reset!');
      }
      global.caches.delete(PAGES_CACHE);
    case 'update':
      const urls = Array.isArray(message.url) ? message.url : [message.url];

      urls.forEach(url => {
        const headers = new Headers();
        headers.append('Cookie', message.cookie);
        fetch(url, {
          headers,
          credentials: 'same-origin',
        }).then(function(response) {
          global.caches
            .open(PAGES_CACHE)
            .then(cache => {
              return cache.put(url, response);
            })
            .then(() => {
              if (DEBUG) {
                console.log(`[SW] Update asset: ${url}`);
              }
            });
        });
      });
    default:
      break;
  }
}

export default message;
