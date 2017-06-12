"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getArticles(_ref) {
  var props = _ref.props,
      firebase = _ref.firebase;

  return firebase.value("tagArticles/" + props.req.params.tag).then(function (response) {
    return { articles: response.value };
  });
}

exports.default = getArticles;