'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _utils = require('../../utils');

/** @jsx h */
function Article(_ref) {
  var article = _ref.article;

  return (0, _preact.h)(
    'article',
    { className: 'Article-content' },
    (0, _utils.compileArticle)(article).tree
  );
}

exports.default = Article;