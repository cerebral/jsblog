'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  signIn: function signIn() {
    var _this = this;

    var provider = new _firebase2.default.auth.GithubAuthProvider();
    return _firebase2.default.auth().signInWithPopup(provider).then(function (result) {
      var accessToken = result.credential.accessToken;
      var headers = new Headers();
      headers.append('Authorization', 'token ' + accessToken);

      return fetch('https://api.github.com/user/' + result.user.providerData[0].uid, {
        headers: headers
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        var login = data.login;

        if (result.user.displayName === data.login) {
          return result.user;
        }

        var currentUser = _firebase2.default.auth().currentUser;
        return Promise.all([currentUser.updateProfile({
          displayName: login
        }), _firebase2.default.database().ref('displayNames/byLogin/' + login).set(result.user.uid), _firebase2.default.database().ref('displayNames/byUid/' + result.user.uid).set(login)]).then(function () {
          return Object.assign({}, result.user, { displayName: login });
        });
      });
    }).then(function (user) {
      return _this.getToken().then(function (token) {
        return { token: token, user: user };
      });
    }).then(function (result) {
      _this.writeCookie(result.token);
      _this.clearCache();

      return result.user;
    });
  },
  signOut: function signOut() {
    var _this2 = this;

    return _firebase2.default.auth().signOut().then(function () {
      _this2.clearCache();
    });
  },
  getToken: function getToken() {
    return _firebase2.default.auth().currentUser.getToken(false);
  },
  writeCookie: function writeCookie(token) {
    document.cookie = '__session=' + token + '; max-age=3600; path=/';
  },
  eraseCookie: function eraseCookie() {
    document.cookie = '__session=INVALID; max-age=0; path=/';
  },
  clearCache: function clearCache() {
    navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(JSON.stringify({ type: 'reset' }));
  }
};