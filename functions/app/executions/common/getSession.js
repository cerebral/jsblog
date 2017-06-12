"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getSession(_ref) {
  var props = _ref.props,
      firebase = _ref.firebase;

  var token = props.req.cookies.__session || null;

  if (token) {
    return firebase.verifyIdToken(token).then(function (decodedToken) {
      return { user: decodedToken || null };
    }).catch(function () {
      return { user: null };
    });
  } else {
    return { user: null };
  }
}

exports.default = getSession;