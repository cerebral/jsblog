import { STATIC_CACHE } from './caches';

function onActivate(event) {
  const cacheWhitelist = [STATIC_CACHE];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
}

export default onActivate;
