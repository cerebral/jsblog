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

var _renderTags = require('./renderTags');

var _renderTags2 = _interopRequireDefault(_renderTags);

var _renderIndex = require('./renderIndex');

var _renderIndex2 = _interopRequireDefault(_renderIndex);

var _getTags = require('./getTags');

var _getTags2 = _interopRequireDefault(_getTags);

var _replaceCachedTags = require('./replaceCachedTags');

var _replaceCachedTags2 = _interopRequireDefault(_replaceCachedTags);

var _hasTagsChanged = require('./hasTagsChanged');

var _hasTagsChanged2 = _interopRequireDefault(_hasTagsChanged);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_getSession2.default, _hasCachedPath2.default, {
  true: [(0, _renderApp2.default)(), _renderTags2.default, _renderIndex2.default, _sendIndex2.default, _getTags2.default, _hasTagsChanged2.default, {
    true: [_renderTags2.default, _replaceCachedTags2.default],
    false: []
  }],
  false: [_getTags2.default, (0, _renderApp2.default)(), _renderTags2.default, _renderIndex2.default, _sendIndex2.default, _replaceCachedTags2.default]
}];