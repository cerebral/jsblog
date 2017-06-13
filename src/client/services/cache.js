export default {
  clearAll() {
    navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        JSON.stringify({ type: 'reset' })
      );
  },
  clearUrl(url) {
    navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        JSON.stringify({ type: 'update', url, cookie: document.cookie })
      );
  },
};
