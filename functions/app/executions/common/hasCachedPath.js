"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function hasCachedPath(_ref) {
  var props = _ref.props,
      cache = _ref.cache,
      path = _ref.path;

  var cachedValue = cache.get(props.req.path);
  return cachedValue ? path.true({ cache: cachedValue }) : path.false();
}

exports.default = hasCachedPath;