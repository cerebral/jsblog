'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appConfig = require('../../../app.config.json');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _preactRenderToString = require('preact-render-to-string');

var _preactRenderToString2 = _interopRequireDefault(_preactRenderToString);

var _DroidSansMono = require('./DroidSansMono.font');

var _DroidSansMono2 = _interopRequireDefault(_DroidSansMono);

var _hund = require('../../../themes/hund');

var _hund2 = _interopRequireDefault(_hund);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themes = { hund: _hund2.default };
var render = {
  index: function index(options) {
    return '<!DOCTYPE html>\n      <html>\n        <head>\n          <style>\n            body {\n              margin: 0;\n              font-family: monospace;\n              -webkit-font-smoothing: antialiased;\n              overflow-y: scroll;\n            }\n            #app {\n              position: absolute;\n            }\n            #page {\n              min-height: 100vh;\n              display: flex;\n              justify-content: center;\n            }\n          </style>\n          <style>' + (options.styles || []).join('\n') + '</style>\n          <style>' + themes[options.theme] + '</style>\n          ' + (options.useDroidSansMono ? '<style>' + _DroidSansMono2.default + '</style>' : '') + '\n        </head>\n        <body>\n          <div id="page">' + options.pageHtml + '</div>\n          <div id="app">' + options.appHtml + '</div>\n          ' + _appConfig2.default.scripts.map(function (script) {
      return '<script src="/' + script + '" defer></script>';
    }).join('\n') + '\n        </body>\n      </html>';
  },
  component: function component(_component) {
    return (0, _preactRenderToString2.default)(_component);
  }
};

function Render(context) {
  context.render = render;

  return context;
}

exports.default = Render;