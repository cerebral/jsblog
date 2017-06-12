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

var _renderWriteArticle = require('./renderWriteArticle');

var _renderWriteArticle2 = _interopRequireDefault(_renderWriteArticle);

var _renderIndex = require('./renderIndex');

var _renderIndex2 = _interopRequireDefault(_renderIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_getSession2.default, (0, _renderApp2.default)({
  isWriting: true
}), _renderWriteArticle2.default, _renderIndex2.default, _sendIndex2.default];