import { STATIC_CACHE } from './caches';

const { assets } = global.serviceWorkerOption;
const staticAssetsToCache = assets.map(path => {
  return new URL(path, global.location).toString();
});

function install(event) {
  if (DEBUG) {
    console.log('[SW] Install event');
  }

  event.waitUntil(
    global.caches
      .open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(staticAssetsToCache);
      })
      .then(() => {
        if (DEBUG) {
          console.log('Cached static assets: main', staticAssetsToCache);
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      })
  );
}

export default install;
