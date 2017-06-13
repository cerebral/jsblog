'use strict';

var _onInstall = require('./onInstall');

var _onInstall2 = _interopRequireDefault(_onInstall);

var _onActivate = require('./onActivate');

var _onActivate2 = _interopRequireDefault(_onActivate);

var _onMessage = require('./onMessage');

var _onMessage2 = _interopRequireDefault(_onMessage);

var _onFetch = require('./onFetch');

var _onFetch2 = _interopRequireDefault(_onFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

self.addEventListener('install', _onInstall2.default);
self.addEventListener('activate', _onActivate2.default);
self.addEventListener('message', _onMessage2.default);
self.addEventListener('fetch', _onFetch2.default);