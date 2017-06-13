"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function setCache(_ref) {
  var props = _ref.props,
      cache = _ref.cache;

  cache.set(props.req.path, {
    content: props.article.content,
    html: props.articleContent.html,
    script: props.articleContent.script,
    style: props.articleContent.style
  });
}

exports.default = setCache;