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
      fetch(message.url).then(function(response) {
        global.caches
          .open(PAGES_CACHE)
          .then(cache => {
            return cache.put(message.url, response);
          })
          .then(() => {
            if (DEBUG) {
              console.log(`[SW] Update asset: ${message.url}`);
            }
          });
      });
    default:
      break;
  }
}

export default message;
