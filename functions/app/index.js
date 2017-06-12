'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _renderRoot = require('./executions/renderRoot');

var _renderRoot2 = _interopRequireDefault(_renderRoot);

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

var _renderWriteArticle = require('./executions/renderWriteArticle');

var _renderWriteArticle2 = _interopRequireDefault(_renderWriteArticle);

var _renderArticle = require('./executions/renderArticle');

var _renderArticle2 = _interopRequireDefault(_renderArticle);

var _renderTagArticles = require('./executions/renderTagArticles');

var _renderTagArticles2 = _interopRequireDefault(_renderTagArticles);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cookieParser2.default)());

app.use(function (req, res, next) {
  next();
});

app.get('/', (0, _run2.default)(_renderRoot2.default));

app.get('/drafts/:displayName/:draftKey', (0, _run2.default)(_renderWriteArticle2.default));
app.get('/tags/:tag', (0, _run2.default)(_renderTagArticles2.default));

app.get('/articles/:displayName', function (req, res) {});

app.get('/articles/:displayName/:articleKey', (0, _run2.default)(_renderArticle2.default));

exports.default = app;