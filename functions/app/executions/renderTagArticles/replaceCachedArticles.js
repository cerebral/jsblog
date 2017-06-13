'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function replaceCachedArticles(_ref) {
  var props = _ref.props,
      cache = _ref.cache;

  cache.set(props.req.path, {
    content: Object.keys(props.articles || []).join(','),
    html: props.tagArticlesContent.html,
    style: props.tagArticlesContent.style
  });
}

exports.default = replaceCachedArticles;