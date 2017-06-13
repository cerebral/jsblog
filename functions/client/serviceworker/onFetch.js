'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _caches = require('./caches');

function backgroundFetch(request, requestUrl, response) {
  var copyCheck = response && response.clone();

  return fetch(request).then(function (responseNetwork) {
    if (!responseNetwork || !responseNetwork.ok) {
      if (DEBUG) {
        console.log('[SW] URL [' + requestUrl.toString() + '] wrong responseNetwork: ' + responseNetwork.status + ' ' + responseNetwork.type);
      }

      return responseNetwork;
    }

    if (copyCheck) {
      console.log('Verifying any change');
      Promise.all([copyCheck.text(), responseNetwork.clone().text()]).then(function (texts) {
        if (texts[0] !== texts[1]) {
          self.clients.matchAll().then(function (clients) {
            Promise.all(clients.map(function (client) {
              return client.postMessage(JSON.stringify({
                type: 'update',
                url: requestUrl.pathname
              }));
            }));
          });
        } else {
          console.log('There was no change!');
        }
      }).catch(function (error) {
        console.log('Unable to verify change', error);
      });
    }

    if (DEBUG) {
      console.log('[SW] URL ' + requestUrl.href + ' fetched');
    }

    var responseCache = responseNetwork.clone();

    global.caches.open(requestUrl.href.match(/\.js$/) ? _caches.STATIC_CACHE : _caches.PAGES_CACHE).then(function (cache) {
      return cache.put(request, responseCache);
    }).then(function () {
      if (DEBUG) {
        console.log('[SW] Cache asset: ' + requestUrl.href);
      }
    });

    return responseNetwork;
  }).catch(function (error) {
    // User is landing on our page.
    if (event.request.mode === 'navigate') {
      return global.caches.match('./');
    }

    console.log(error);

    return null;
  });
}

function onFetch(event) {
  var request = event.request;

  // Ignore not GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log('[SW] Ignore non GET request ' + request.method);
    }
    return;
  }

  var requestUrl = new URL(request.url);
  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (DEBUG) {
      console.log('[SW] Ignore difference origin ' + requestUrl.origin);
    }
    return;
  }

  var resource = global.caches.match(request).then(function (response) {
    if (response && requestUrl.href.match(/\.js$/)) {
      if (DEBUG) {
        console.log('[SW] fetch SCRIPT ' + requestUrl.href + ' from cache');
      }

      return response;
    } else if (response && DEBUG) {
      console.log('[SW] fetch PAGE in background ' + requestUrl.href);
    }

    var fetched = backgroundFetch(request, requestUrl, response);

    return response || fetched;
  });

  event.respondWith(resource);
}

exports.default = onFetch;