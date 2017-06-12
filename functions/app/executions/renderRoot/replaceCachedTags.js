'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function replaceCachedArticle(_ref) {
  var props = _ref.props,
      cache = _ref.cache;

  cache.set(props.req.path, {
    content: Object.keys(props.tags).join(','),
    html: props.tagsContent.html,
    script: props.tagsContent.script,
    style: props.tagsContent.style
  });
}

exports.default = replaceCachedArticle;