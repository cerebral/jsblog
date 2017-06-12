'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cache = {};
function Cache(context) {
  context.cache = {
    set: function set(key, content) {
      cache[key] = content;
    },
    get: function get(key) {
      return cache[key] || null;
    }
  };

  if (context.debugger) {
    context.debugger.wrapProvider('cache');
  }

  return context;
}

exports.default = Cache;