'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _WriteArticle = require('../../../client/components/WriteArticle');

var _WriteArticle2 = _interopRequireDefault(_WriteArticle);

var _highlightStyles = require('../../../client/components/Article/highlight.styles.js');

var _highlightStyles2 = _interopRequireDefault(_highlightStyles);

var _styles = require('../../../client/components/WriteArticle/styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
function renderWriteArticle(_ref) {
  var props = _ref.props;

  return {
    writeArticleContent: {
      html: '',
      style: _highlightStyles2.default + '\n' + _styles2.default
    }
  };
}

exports.default = renderWriteArticle;