"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getUid(_ref) {
  var props = _ref.props,
      firebase = _ref.firebase;

  return firebase.value("displayNames/byLogin/" + props.req.params.displayName).then(function (response) {
    return {
      uid: response.value
    };
  });
}

exports.default = getUid;