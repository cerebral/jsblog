import { PAGES_CACHE, STATIC_CACHE } from '../caches';

function fetchUrl(url, cookie) {
  const headers = new Headers();

  headers.append('Cookie', cookie);

  if (DEBUG) {
    console.log('[SW] Prefetch ' + url, 'has cookie: ', Boolean(cookie));
  }
  return fetch(url, {
    headers,
    credentials: 'same-origin',
  });
}

function verifyPageUpdate(url, response) {
  return global.caches.match(url).then(cachedResponse => {
    if (DEBUG) {
      console.log(
        '[SW] Verify page update ' + url,
        'has cache: ',
        Boolean(cachedResponse)
      );
    }
    if (!cachedResponse) {
      return false;
    }

    return Promise.all([
      response.clone().text(),
      cachedResponse.text(),
    ]).then(texts => {
      const scriptsAMatch =
        texts[0].match(
          /\<\!\-\- APP_SCRIPTS_START \-\-\>([\s\S]*)\<\!\-\- APP_SCRIPTS_END \-\-\>/
        ) || [];
      const scriptsBMatch =
        texts[1].match(
          /\<\!\-\- APP_SCRIPTS_START \-\-\>([\s\S]*)\<\!\-\- APP_SCRIPTS_END \-\-\>/
        ) || [];

      if (
        scriptsAMatch[1] &&
        scriptsBMatch[1] &&
        scriptsAMatch[1] !== scriptsBMatch[1]
      ) {
        if (DEBUG) {
          console.log('[SW] Script change ' + url);
        }
        return Promise.all([
          caches.delete(STATIC_CACHE),
          caches.delete(PAGES_CACHE),
        ]).then(() => {
          return 'version';
        });
      }

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
        (pageAMatch[1] && pageBMatch[1] && pageAMatch[1] !== pageBMatch[1])
      ) {
        if (DEBUG) {
          console.log('[SW] App/Style change ' + url);
        }
        return global.caches
          .open(PAGES_CACHE)
          .then(cache => cache.put(url, response).then(() => 'update'));
      }
    });
  });
}

function update(message) {
  if (DEBUG) {
    console.log('[SW] Running update');
  }
  const currentUrl = message.urls.shift();

  return fetchUrl(currentUrl, message.cookie)
    .then(response => {
      return verifyPageUpdate(currentUrl, response);
    })
    .then(update => {
      if (update) {
        if (DEBUG) {
          console.log('[SW] Ask client to update', update);
        }
        return self.clients.matchAll().then(function(clients) {
          Promise.all(
            clients.map(function(client) {
              return client.postMessage(
                JSON.stringify({
                  type: update,
                  url: currentUrl,
                })
              );
            })
          );
        });
      } else {
        if (DEBUG) {
          console.log('[SW] Prefetch remaining');
        }
        return Promise.all(
          message.urls.map(url => {
            return fetchUrl(url, message.cookie);
          })
        ).then(responses => {
          return global.caches.open(PAGES_CACHE).then(cache => {
            return Promise.all(
              responses.map((response, index) => {
                return cache.put(message.urls[index], response);
              })
            );
          });
        });
      }
    });
}

export default update;
