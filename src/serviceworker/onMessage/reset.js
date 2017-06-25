import { PAGES_CACHE } from '../caches';

function reset() {
  if (DEBUG) {
    console.log('[SW] Cache has been reset!');
  }
  return global.caches.delete(PAGES_CACHE);
}

export default reset;
