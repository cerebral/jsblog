'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _serviceAccount = require('../serviceAccount.json');

var _serviceAccount2 = _interopRequireDefault(_serviceAccount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publishApp = _firebaseAdmin2.default.initializeApp({
  credential: _firebaseAdmin2.default.credential.cert(_serviceAccount2.default),
  databaseURL: 'https://gblog-f47ee.firebaseio.com'
}, 'publish');

function publish(event) {
  var dataValue = event.data.val();
  var previousValue = event.data.previous.val();

  return publishApp.database().ref('displayNames/byUid/' + event.data.ref.parent.key).once('value', function (snapshot) {
    var displayName = snapshot.val();
    var update = Object.assign({
      content: dataValue.content,
      datetime: dataValue.datetime,
      author: displayName,
      href: '/articles/' + displayName + '/' + dataValue.articleName,
      title: dataValue.title
    }, previousValue ? {} : {
      readCount: 0,
      recommendedCount: 0,
      publishDatetime: Date.now()
    });

    return publishApp.database().ref('tagArticles/' + dataValue.tag + '/' + dataValue.key).update(update);
  });
}

exports.default = publish;