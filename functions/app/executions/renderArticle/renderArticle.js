'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _Article = require('../../../client/components/Article');

var _Article2 = _interopRequireDefault(_Article);

var _highlightStyles = require('../../../client/components/Article/highlight.styles.js');

var _highlightStyles2 = _interopRequireDefault(_highlightStyles);

var _styles = require('../../../client/components/Article/styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
function renderArticle(_ref) {
  var props = _ref.props,
      render = _ref.render;

  if (props.cache) {
    return { articleContent: props.cache };
  }

  return {
    articleContent: {
      html: render.component((0, _preact.h)(_Article2.default, { article: props.article.content })),
      style: _highlightStyles2.default + '\n' + _styles2.default
    }
  };
}

exports.default = renderArticle;