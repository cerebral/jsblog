'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
function Login(_ref) {
  var isLoggedIn = _ref.isLoggedIn,
      isChangingAuthentication = _ref.isChangingAuthentication,
      toggleLogin = _ref.toggleLogin;

  return (0, _preact.h)(
    'button',
    {
      onClick: toggleLogin,
      className: (0, _classnames2.default)('App-button', 'Login-button', {
        'App-button-loading': isChangingAuthentication
      })
    },
    isChangingAuthentication ? null : isLoggedIn ? 'Log out' : 'Log in'
  );
}

exports.default = Login;