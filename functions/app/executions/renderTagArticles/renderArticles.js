'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _TagArticles = require('../../../client/components/TagArticles');

var _TagArticles2 = _interopRequireDefault(_TagArticles);

var _styles = require('../../../client/components/TagArticles/styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderTagArticles(_ref) {
  var props = _ref.props,
      render = _ref.render;

  if (props.cache) {
    return { tagArticlesContent: props.cache };
  }

  var articles = Object.keys(props.articles).reduce(function (allArticles, articleKey) {
    return allArticles.concat(props.articles[articleKey]);
  }, []);

  return {
    tagArticlesContent: {
      html: render.component((0, _preact.h)(_TagArticles2.default, { articles: articles })),
      style: _styles2.default
    }
  };
} /** @jsx h */
exports.default = renderTagArticles;