'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function hasTagArticlesChanged(_ref) {
  var props = _ref.props,
      state = _ref.state,
      path = _ref.path;

  return props.cache.content === Object.keys(props.articles).join(',') ? path.false() : path.true();
}

exports.default = hasTagArticlesChanged;