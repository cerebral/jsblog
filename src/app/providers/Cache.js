const cache = {};
function Cache(context) {
  context.cache = {
    set(key, content) {
      cache[key] = content;
    },
    get(key) {
      return cache[key] || null;
    },
    clear(key) {
      delete cache[key];
    },
  };

  if (context.debugger) {
    context.debugger.wrapProvider('cache');
  }

  return context;
}

export default Cache;
