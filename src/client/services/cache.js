export default {
  clearAll() {
    navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        JSON.stringify({ type: 'reset' })
      );
  },
  updateUrls(urls) {
    navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        JSON.stringify({
          type: 'update',
          urls,
          currentUrl: location.href,
          cookie: document.cookie,
        })
      );
  },
};
