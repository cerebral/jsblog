/** @jsx h */
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { h, render } from 'preact';
import FirebaseProvider from '@cerebral/firebase';
import UrlMapper from 'url-mapper';
import firebase from 'firebase';
import stats from './services/stats';
import authentication from './services/authentication';

let hasVerifiedUser = false;
let user = null;

firebase.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));

function renderApp(Comp, props = {}) {
  const container = document.querySelector('#app');
  render(<Comp {...props} />, container, container.lastChild);
}

function renderPage(Comp, props = {}) {
  const container = document.querySelector('#page');
  render(<Comp {...props} />, container, container.lastChild);
}

function route(path, props = {}) {
  const urlMapper = UrlMapper();
  const matchedRoute = urlMapper.map(path, {
    '/': function() {
      require.ensure([], () => {
        renderApp(
          require('./components/App').default,
          Object.assign(props, { user })
        );
      });
    },
    '/drafts/:displayName/:draftKey': function(params) {
      require.ensure([], () => {
        renderApp(
          require('./components/App').default,
          Object.assign(props, {
            user,
            isWriting: true,
            params,
          })
        );
        renderPage(require('./components/WriteArticle').default, {
          user,
          params,
        });
      });
    },
    '/tags/:tag': function() {
      require.ensure([], () => {
        renderApp(
          require('./components/App').default,
          Object.assign(props, { user })
        );
      });
    },
    '/articles/:displayName/:articleName': function(params) {
      require.ensure([], () => {
        renderApp(
          require('./components/App').default,
          Object.assign(props, { user, params })
        );
        stats.trackArticleRead(params);
      });
    },
  });

  if (matchedRoute) {
    matchedRoute.match(matchedRoute.values);
  }
}

firebase.auth().onAuthStateChanged(function(authorizedUser) {
  if (hasVerifiedUser) {
    return;
  }

  hasVerifiedUser = true;
  user = authorizedUser;

  route(location.pathname);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', function(event) {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'update':
        route(message.url, {
          hasUpdate: true,
        });
        return;
    }
  });

  runtime
    .register()
    .then(() => {
      return navigator.serviceWorker.ready;
    })
    .then(reg => {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
        })
        .then(function(sub) {
          fetch('/subscribe', {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(sub),
          });
        });
    });
}

let hidden, visibilityChange;
if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

function handleVisibilityChange() {
  if (!document[hidden]) {
    authentication.getToken().then(token => authentication.writeCookie(token));
  }
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);
