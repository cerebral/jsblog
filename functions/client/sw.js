'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//  weak
/* eslint-disable no-console */

var DEBUG = process.env.NODE_ENV !== 'production';

// When the user navigates to your site,
// the browser tries to redownload the script file that defined the service
// worker in the background.
// If there is even a byte's difference in the service worker file compared
// to what it currently has, it considers it 'new'.
var assets = global.serviceWorkerOption.assets;


var STATIC_CACHE = 'STATIC_CACHE';
var PAGES_CACHE = 'PAGES_CACHE';

var staticAssetsToCache = [].concat(_toConsumableArray(assets));

staticAssetsToCache = staticAssetsToCache.map(function (path) {
  return new URL(path, global.location).toString();
});

// When the service worker is first added to a computer.
self.addEventListener('install', function (event) {
  // Perform install steps.
  if (DEBUG) {
    console.log('[SW] Install event');
  }

  // Add core website files to cache during serviceworker installation.
  event.waitUntil(global.caches.open(STATIC_CACHE).then(function (cache) {
    return cache.addAll(staticAssetsToCache);
  }).then(function () {
    if (DEBUG) {
      console.log('Cached static assets: main', staticAssetsToCache);
    }
  }).catch(function (error) {
    console.error(error);
    throw error;
  }));
});

// After the install event.
self.addEventListener('activate', function (event) {
  if (DEBUG) {
    console.log('[SW] Activate event');
  }

  // Clean the caches
  event.waitUntil(global.caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      // Delete the caches that are not the current one.
      if (cacheName.indexOf(STATIC_CACHE) === 0) {
        return null;
      }

      return global.caches.delete(cacheName);
    }));
  }));
});

self.addEventListener('message', function (event) {
  switch (event.data) {
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
    default:
      break;
  }
});

self.addEventListener('fetch', function (event) {
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

    var fetched = fetch(request).then(function (responseNetwork) {
      if (!responseNetwork || !responseNetwork.ok) {
        if (DEBUG) {
          console.log('[SW] URL [' + requestUrl.toString() + '] wrong responseNetwork: ' + responseNetwork.status + ' ' + responseNetwork.type);
        }

        return responseNetwork;
      }

      if (DEBUG) {
        console.log('[SW] URL ' + requestUrl.href + ' fetched');
      }

      var responseCache = responseNetwork.clone();

      global.caches.open(requestUrl.href.match(/\.js$/) ? STATIC_CACHE : PAGES_CACHE).then(function (cache) {
        return cache.put(request, responseCache);
      }).then(function () {
        if (DEBUG) {
          console.log('[SW] Cache asset: ' + requestUrl.href);
        }
      });

      return responseNetwork;
    }).catch(function () {
      // User is landing on our page.
      if (event.request.mode === 'navigate') {
        return global.caches.match('./');
      }

      return null;
    });

    return response || fetched;
  });

  event.respondWith(resource);
});