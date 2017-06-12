"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function hasArticleChanged(_ref) {
  var props = _ref.props,
      state = _ref.state,
      path = _ref.path;

  return props.cache.content === props.article.content ? path.false() : path.true();
}

exports.default = hasArticleChanged;