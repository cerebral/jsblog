'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getSession = require('../common/getSession');

var _getSession2 = _interopRequireDefault(_getSession);

var _sendIndex = require('../common/sendIndex');

var _sendIndex2 = _interopRequireDefault(_sendIndex);

var _hasCachedPath = require('../common/hasCachedPath');

var _hasCachedPath2 = _interopRequireDefault(_hasCachedPath);

var _renderApp = require('../common/renderApp');

var _renderApp2 = _interopRequireDefault(_renderApp);

var _renderTagArticles = require('./renderTagArticles');

var _renderTagArticles2 = _interopRequireDefault(_renderTagArticles);

var _renderIndex = require('./renderIndex');

var _renderIndex2 = _interopRequireDefault(_renderIndex);

var _getArticles = require('./getArticles');

var _getArticles2 = _interopRequireDefault(_getArticles);

var _replaceCachedArticles = require('./replaceCachedArticles');

var _replaceCachedArticles2 = _interopRequireDefault(_replaceCachedArticles);

var _hasTagArticlesChanged = require('./hasTagArticlesChanged');

var _hasTagArticlesChanged2 = _interopRequireDefault(_hasTagArticlesChanged);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_getSession2.default, _hasCachedPath2.default, {
  true: [(0, _renderApp2.default)(), (0, _renderTagArticles2.default)(), _renderIndex2.default, _sendIndex2.default, _getArticles2.default, _hasTagArticlesChanged2.default, {
    true: [(0, _renderTagArticles2.default)(true), _replaceCachedArticles2.default],
    false: []
  }],
  false: [_getArticles2.default, (0, _renderApp2.default)(), (0, _renderTagArticles2.default)(), _renderIndex2.default, _sendIndex2.default, _replaceCachedArticles2.default]
}];