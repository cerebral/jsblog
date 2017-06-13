'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  clearAll: function clearAll() {},
  clearUrl: function clearUrl(url) {
    navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(JSON.stringify({ type: 'update', url: url, cookie: document.cookie }));
  }
};