'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx h */


var _preact = require('preact');

var _App = require('../../../client/components/App');

var _App2 = _interopRequireDefault(_App);

var _styles = require('../../../client/components/App/styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderAppFactory(props) {
  function renderApp(_ref) {
    var props = _ref.props,
        render = _ref.render;

    return {
      appContent: {
        html: render.component((0, _preact.h)(_App2.default, _extends({ user: props.user }, props))),
        style: _styles2.default
      }
    };
  }

  return renderApp;
}

exports.default = renderAppFactory;