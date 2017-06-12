'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
function Publish(_ref) {
  var onClick = _ref.onClick,
      isPublishingDraft = _ref.isPublishingDraft;

  return (0, _preact.h)(
    'button',
    {
      className: (0, _classnames2.default)('App-button', 'Publish-button', {
        'App-button-loading': isPublishingDraft
      }),
      onClick: onClick
    },
    'Publish'
  );
}

exports.default = Publish;