'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
function New(_ref) {
  var isLoggedIn = _ref.isLoggedIn,
      onClick = _ref.onClick,
      isPreparingNewDraft = _ref.isPreparingNewDraft;

  return (0, _preact.h)(
    'button',
    {
      className: (0, _classnames2.default)('App-button', 'New-button', {
        'App-button-loading': isPreparingNewDraft,
        'New-button-visible': isLoggedIn
      }),
      onClick: onClick
    },
    'New'
  );
}

exports.default = New;