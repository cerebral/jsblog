'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getTags(_ref) {
  var firebase = _ref.firebase;

  return firebase.value('tags').then(function (response) {
    return { tags: response.value };
  });
}

exports.default = getTags;