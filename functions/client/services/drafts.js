'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  get: function get(path) {
    return _firebase2.default.database().ref(path).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },
  new: function _new(user) {
    var newDraftKey = _firebase2.default.database().ref().child('drafts/' + user.uid).push().key;

    return _firebase2.default.database().ref('drafts/' + user.uid + '/' + newDraftKey).set({
      title: 'No Title',
      datetime: Date.now(),
      content: '',
      isPublished: false
    }).then(function () {
      return newDraftKey;
    });
  },
  save: function save(path, data) {
    var draft = Object.assign(data, {
      datetime: Date.now()
    });
    return _firebase2.default.database().ref(path).update(draft).then(function () {
      return draft;
    });
  },
  getTitleFromToc: function getTitleFromToc(toc) {
    for (var node in toc) {
      if (toc[node].level === 1) {
        return toc[node].title;
      }
    }

    return 'No Title';
  },
  createArticleName: function createArticleName(title) {
    return title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '_');
  },
  publish: function publish(path, draft) {
    return _firebase2.default.database().ref(path).set(draft).then(function () {});
  }
};