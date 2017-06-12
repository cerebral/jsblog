'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getSession = require('../common/getSession');

var _getSession2 = _interopRequireDefault(_getSession);

var _sendIndex = require('../common/sendIndex');

var _sendIndex2 = _interopRequireDefault(_sendIndex);

var _renderApp = require('../common/renderApp');

var _renderApp2 = _interopRequireDefault(_renderApp);

var _hasCachedPath = require('../common/hasCachedPath');

var _hasCachedPath2 = _interopRequireDefault(_hasCachedPath);

var _renderArticle = require('./renderArticle');

var _renderArticle2 = _interopRequireDefault(_renderArticle);

var _renderIndex = require('./renderIndex');

var _renderIndex2 = _interopRequireDefault(_renderIndex);

var _getArticle = require('./getArticle');

var _getArticle2 = _interopRequireDefault(_getArticle);

var _replaceCachedArticle = require('./replaceCachedArticle');

var _replaceCachedArticle2 = _interopRequireDefault(_replaceCachedArticle);

var _hasArticleChanged = require('./hasArticleChanged');

var _hasArticleChanged2 = _interopRequireDefault(_hasArticleChanged);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_getSession2.default, _hasCachedPath2.default, {
  true: [(0, _renderApp2.default)(), _renderArticle2.default, _renderIndex2.default, _sendIndex2.default, _getArticle2.default, _hasArticleChanged2.default, {
    true: [_renderArticle2.default, _replaceCachedArticle2.default],
    false: []
  }],
  false: [_getArticle2.default, (0, _renderApp2.default)(), _renderArticle2.default, _renderIndex2.default, _sendIndex2.default, _replaceCachedArticle2.default]
}];