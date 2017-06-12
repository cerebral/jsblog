export default {
  clearAll() {},
  clearUrl(url) {
    navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        JSON.stringify({ type: 'update', url })
      );
  },
};
