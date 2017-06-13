'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compile = undefined;
exports.compileArticle = compileArticle;

var _preact = require('preact');

var _highlight = require('highlight.js/lib/highlight');

var _highlight2 = _interopRequireDefault(_highlight);

var _javascript = require('highlight.js/lib/languages/javascript');

var _javascript2 = _interopRequireDefault(_javascript);

var _xml = require('highlight.js/lib/languages/xml');

var _xml2 = _interopRequireDefault(_xml);

var _css = require('highlight.js/lib/languages/css');

var _css2 = _interopRequireDefault(_css);

var _marksy = require('marksy');

var _marksy2 = _interopRequireDefault(_marksy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
_highlight2.default.registerLanguage('javascript', _javascript2.default);
_highlight2.default.registerLanguage('xml', _xml2.default);
_highlight2.default.registerLanguage('css', _css2.default);

var compile = exports.compile = (0, _marksy2.default)({
  createElement: _preact.h,
  highlight: _highlight2.default
});

function compileArticle(content) {
  return compile(content);
}