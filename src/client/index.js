/** @jsx h */
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { h, render } from 'preact';
import FirebaseProvider from '@cerebral/firebase';
import UrlMapper from 'url-mapper';
import firebase from 'firebase';

let hasVerifiedUser = false;
let user = null;

firebase.initializeApp({
  apiKey: 'AIzaSyAn9hulrfDCwhzu66Mb6hJIbP9Z2TSo1T8',
  authDomain: 'gblog-f47ee.firebaseapp.com',
  databaseURL: 'https://gblog-f47ee.firebaseio.com',
  projectId: 'gblog-f47ee',
  storageBucket: 'gblog-f47ee.appspot.com',
  messagingSenderId: '298543710360',
});

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
    '/articles/:displayName/:article': function(params) {
      require.ensure([], () => {
        renderApp(
          require('./components/App').default,
          Object.assign(props, { user, params })
        );
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
  const registration = runtime.register();
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
}
