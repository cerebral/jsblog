'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _caches = require('./caches');

function activate(event) {
  if (DEBUG) {
    console.log('[SW] Activate event');
  }

  event.waitUntil(global.caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheName.indexOf(_caches.STATIC_CACHE) === 0) {
        return null;
      }

      return global.caches.delete(cacheName);
    }));
  }));
}

exports.default = activate;