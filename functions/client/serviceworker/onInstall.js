'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _caches = require('./caches');

var assets = global.serviceWorkerOption.assets;

var staticAssetsToCache = assets.map(function (path) {
  return new URL(path, global.location).toString();
});

function install(event) {
  if (DEBUG) {
    console.log('[SW] Install event');
  }

  event.waitUntil(global.caches.open(_caches.STATIC_CACHE).then(function (cache) {
    return cache.addAll(staticAssetsToCache);
  }).then(function () {
    if (DEBUG) {
      console.log('Cached static assets: main', staticAssetsToCache);
    }
  }).catch(function (error) {
    console.error(error);
    throw error;
  }));
}

exports.default = install;