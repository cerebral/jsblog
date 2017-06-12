'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getArticle(_ref) {
  var firebase = _ref.firebase;

  return firebase.value('articles/456/123').then(function (response) {
    return { article: response.value };
  });
}

exports.default = getArticle;