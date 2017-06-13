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

var _setCache = require('./setCache');

var _setCache2 = _interopRequireDefault(_setCache);

var _hasArticleChanged = require('./hasArticleChanged');

var _hasArticleChanged2 = _interopRequireDefault(_hasArticleChanged);

var _getUid = require('./getUid');

var _getUid2 = _interopRequireDefault(_getUid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_getSession2.default, _hasCachedPath2.default, {
  true: [(0, _renderApp2.default)(), (0, _renderArticle2.default)(), _renderIndex2.default, _sendIndex2.default, _getUid2.default, _getArticle2.default, _hasArticleChanged2.default, {
    true: [(0, _renderArticle2.default)(true), _setCache2.default],
    false: []
  }],
  false: [_getUid2.default, _getArticle2.default, (0, _renderApp2.default)(), (0, _renderArticle2.default)(), _renderIndex2.default, _sendIndex2.default, _setCache2.default]
}];