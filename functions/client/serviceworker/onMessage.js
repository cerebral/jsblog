'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _caches = require('./caches');

function message(event) {
  var message = JSON.parse(event.data);

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
      global.caches.delete(_caches.PAGES_CACHE);
    case 'update':
      var urls = Array.isArray(message.url) ? message.url : [message.url];

      urls.forEach(function (url) {
        var headers = new Headers();
        headers.append('Cookie', message.cookie);
        fetch(url, {
          headers: headers,
          credentials: 'same-origin'
        }).then(function (response) {
          global.caches.open(_caches.PAGES_CACHE).then(function (cache) {
            return cache.put(url, response);
          }).then(function () {
            if (DEBUG) {
              console.log('[SW] Update asset: ' + url);
            }
          });
        });
      });
    default:
      break;
  }
}

exports.default = message;