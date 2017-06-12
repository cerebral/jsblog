"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function sendIndex(_ref) {
  var props = _ref.props,
      res = _ref.res;

  props.res.status(200).send(props.index);
}

exports.default = sendIndex;