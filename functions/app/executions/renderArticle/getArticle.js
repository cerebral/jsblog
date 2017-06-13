"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getArticle(_ref) {
  var props = _ref.props,
      firebase = _ref.firebase;

  return firebase.value("articles/" + props.uid + "/" + props.req.params.articleName).then(function (response) {
    return { article: response.value };
  });
}

exports.default = getArticle;