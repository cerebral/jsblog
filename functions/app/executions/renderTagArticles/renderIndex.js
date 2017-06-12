'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function renderIndex(_ref) {
  var props = _ref.props,
      render = _ref.render;

  return {
    index: render.index({
      appHtml: props.appContent.html,
      pageHtml: props.tagArticlesContent.html,
      styles: [props.appContent.style, props.tagArticlesContent.style],
      theme: 'hund',
      useDroidSansMono: true
    })
  };
}

exports.default = renderIndex;