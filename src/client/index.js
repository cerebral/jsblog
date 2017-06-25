/** @jsx h */
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { h, render } from 'preact';
import FirebaseProvider from '@cerebral/firebase';
import UrlMapper from 'url-mapper';
import firebase from 'firebase';
import stats from './services/stats';
import authentication from './services/authentication';
import cache from './services/cache';

let hasVerifiedUser = false;
let user = null;

firebase.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));

/*
  JSBlog is split into two. The App and the Page. Currently only the "write article" page
  is rendered on the client as well, due to its interactive nature.
*/

/*
  Render the main application (logo, login, console)
*/
function renderApp(Comp, props = {}) {
  const container = document.querySelector('#app');
  render(<Comp {...props} />, container, container.lastChild);
}

/*
  Render specific page, currently only WriteArticle
*/
function renderPage(Comp, props = {}) {
  const container = document.querySelector('#page');
  render(<Comp {...props} />, container, container.lastChild);
}

/*
  Route to correct page
*/
function route(path, props = {}, updateCache = true) {
  updateCache &&
    cache.updateUrls([location.href].concat(window.PREFETCHES || []));
  /*
    The URL mapper allows us to easily map urls to execution. We lazy load
    the app/pages and then render them
  */
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

/*
  Due to Firebase redirect on mobile login we need to check if that has happened
*/
firebase.auth().getRedirectResult().then(function(result) {
  /*
    If a github redirect has happened we render the app with a signing in indication
    and update the profile to grab github login and setting the theme
  */
  if (result.user) {
    user = result.user;
    route(location.pathname, {
      isAuthRedirected: true,
    });
    authentication.updateProfile(result).then(() =>
      route(location.pathname, {
        isAuthRedirected: false,
      })
    );
  } else {
    /*
      We listen to changes to authentication (triggered immedietly)
    */
    firebase.auth().onAuthStateChanged(function(authorizedUser) {
      if (hasVerifiedUser) {
        return;
      }

      hasVerifiedUser = true;
      user = authorizedUser;

      /*
        If we have a user we want to update the auth token and write it to
        a cookie so that the server knows which user makes requests, putting correct
        theme and other content on the response. If user is anonymous we just route
      */
      if (user) {
        authentication
          .getToken()
          .then(token => authentication.writeCookie(token))
          .then(() => route(location.pathname));
      } else {
        route(location.pathname);
      }
    });
  }
});

if ('serviceWorker' in navigator) {
  /*
    The service worker sends a message of "update" when cache is updated and
    the new cache differs from current version, allowing user to click page to
    update to latest
  */
  navigator.serviceWorker.addEventListener('message', function(event) {
    const message = typeof event.data === 'string'
      ? JSON.parse(event.data)
      : event.data;

    switch (message.type) {
      case 'update':
        return route(
          location.pathname,
          {
            hasUpdate: true,
          },
          false
        );
      case 'version':
        return route(
          location.pathname,
          {
            hasNewVersion: true,
          },
          false
        );
    }
  });

  /*
    We register the messaging and service worker. The registration is then used to
    grab the messaging token for notifications. This is sent to the server "/subscribe"
  */
  const messaging = firebase.messaging();
  const registration = runtime.register().then(registration => {
    messaging.useServiceWorker(registration);
    messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return messaging
          .getToken()
          .then(function(currentToken) {
            if (currentToken) {
              fetch('/subscribe', {
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ token: currentToken }),
              });
            }
          })
          .catch(err => {
            console.log('An error occurred while retrieving token. ', err);
          });
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  });
}

/*
  When the app goes out of focus and back in we want to update the token as most likely
  some time has passed and the token has expired.
*/
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
  if (!document[hidden] && user) {
    authentication.getToken().then(token => authentication.writeCookie(token));
  }
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);
