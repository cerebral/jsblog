'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function hasTagsChanged(_ref) {
  var props = _ref.props,
      state = _ref.state,
      path = _ref.path;

  return props.cache.content === Object.keys(props.tags).join(',') ? path.false() : path.true();
}

exports.default = hasTagsChanged;