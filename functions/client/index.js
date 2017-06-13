'use strict';

var _runtime = require('serviceworker-webpack-plugin/lib/runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _preact = require('preact');

var _firebase = require('@cerebral/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _urlMapper = require('url-mapper');

var _urlMapper2 = _interopRequireDefault(_urlMapper);

var _firebase3 = require('firebase');

var _firebase4 = _interopRequireDefault(_firebase3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasVerifiedUser = false; /** @jsx h */

var user = null;

_firebase4.default.initializeApp({
  apiKey: 'AIzaSyAn9hulrfDCwhzu66Mb6hJIbP9Z2TSo1T8',
  authDomain: 'gblog-f47ee.firebaseapp.com',
  databaseURL: 'https://gblog-f47ee.firebaseio.com',
  projectId: 'gblog-f47ee',
  storageBucket: 'gblog-f47ee.appspot.com',
  messagingSenderId: '298543710360'
});

function renderApp(Comp) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var container = document.querySelector('#app');
  (0, _preact.render)((0, _preact.h)(Comp, props), container, container.lastChild);
}

function renderPage(Comp) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var container = document.querySelector('#page');
  (0, _preact.render)((0, _preact.h)(Comp, props), container, container.lastChild);
}

function route(path) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var urlMapper = (0, _urlMapper2.default)();
  var matchedRoute = urlMapper.map(path, {
    '/': function _() {
      require.ensure([], function () {
        renderApp(require('./components/App').default, Object.assign(props, { user: user }));
      });
    },
    '/drafts/:displayName/:draftKey': function draftsDisplayNameDraftKey(params) {
      require.ensure([], function () {
        renderApp(require('./components/App').default, Object.assign(props, {
          user: user,
          isWriting: true,
          params: params
        }));
        renderPage(require('./components/WriteArticle').default, {
          user: user,
          params: params
        });
      });
    },
    '/tags/:tag': function tagsTag() {
      require.ensure([], function () {
        renderApp(require('./components/App').default, Object.assign(props, { user: user }));
      });
    },
    '/articles/:displayName/:article': function articlesDisplayNameArticle(params) {
      require.ensure([], function () {
        renderApp(require('./components/App').default, Object.assign(props, { user: user, params: params }));
      });
    }
  });

  if (matchedRoute) {
    matchedRoute.match(matchedRoute.values);
  }
}

_firebase4.default.auth().onAuthStateChanged(function (authorizedUser) {
  if (hasVerifiedUser) {
    return;
  }

  hasVerifiedUser = true;
  user = authorizedUser;

  route(location.pathname);
});

if ('serviceWorker' in navigator) {
  var registration = _runtime2.default.register();
  navigator.serviceWorker.addEventListener('message', function (event) {
    var message = JSON.parse(event.data);
    switch (message.type) {
      case 'update':
        route(message.url, {
          hasUpdate: true
        });
        return;
    }
  });
}