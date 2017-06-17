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
      return global.caches.delete(PAGES_CACHE);
    case 'update':
      const urls = message.urls;

      return Promise.all(
        urls.map(url => {
          const headers = new Headers();

          headers.append('Cookie', message.cookie);

          if (DEBUG) {
            console.log('[SW] Prefetch ' + url);
          }
          return fetch(url, {
            headers,
            credentials: 'same-origin',
          });
        })
      )
        .then(responses => {
          return global.caches.open(PAGES_CACHE).then(cache => {
            return Promise.all(
              responses.map((response, index) => {
                if (DEBUG) {
                  console.log('[SW] Prefetch cache ' + urls[index]);
                }
                return cache.put(urls[index], response);
              })
            );
          });
        })
        .then(() => {
          return global.caches
            .match(message.currentUrl)
            .then(cachedResponse => {
              const headers = new Headers();

              headers.append('Cookie', message.cookie);

              if (DEBUG) {
                console.log('[SW] Prefetch next current');
              }
              return fetch(message.currentUrl, {
                headers,
                credentials: 'same-origin',
              })
                .then(currentUrlResponse => {
                  return Promise.all([
                    currentUrlResponse.clone().text(),
                    cachedResponse.text(),
                  ]).then(texts => {
                    const themeAMatch =
                      texts[0].match(
                        /\<\!\-\- THEME_CONTENT_START \-\-\>([\s\S]*)\<\!\-\- THEME_CONTENT_END \-\-\>/
                      ) || [];
                    const themeBMatch =
                      texts[1].match(
                        /\<\!\-\- THEME_CONTENT_START \-\-\>([\s\S]*)\<\!\-\- THEME_CONTENT_END \-\-\>/
                      ) || [];
                    const pageAMatch =
                      texts[0].match(
                        /\<\!\-\- PAGE_CONTENT_START \-\-\>([\s\S]*)\<\!\-\- PAGE_CONTENT_END \-\-\>/
                      ) || [];
                    const pageBMatch =
                      texts[1].match(
                        /\<\!\-\- PAGE_CONTENT_START \-\-\>([\s\S]*)\<\!\-\- PAGE_CONTENT_END \-\-\>/
                      ) || [];

                    if (
                      (themeAMatch[1] &&
                        themeBMatch[1] &&
                        themeAMatch[1] !== themeBMatch[1]) ||
                      (pageAMatch[1] &&
                        pageBMatch[1] &&
                        pageAMatch[1] !== pageBMatch[1])
                    ) {
                      return currentUrlResponse;
                    }
                  });
                })
                .then(responseToCache => {
                  if (responseToCache) {
                    return global.caches
                      .open(PAGES_CACHE)
                      .then(cache => {
                        return cache.put(message.currentUrl, responseToCache);
                      })
                      .then(() => {
                        self.clients.matchAll().then(function(clients) {
                          Promise.all(
                            clients.map(function(client) {
                              return client.postMessage(
                                JSON.stringify({
                                  type: 'update',
                                })
                              );
                            })
                          );
                        });
                      });
                  }
                });
            });
        });
    default:
      break;
  }
}

export default message;
