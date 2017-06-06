import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';
import { Container } from 'cerebral/react';
import * as modules from './modules';
import FirebaseProvider from '@cerebral/firebase';
import { StyleSheet } from 'aphrodite';
import UrlMapper from 'url-mapper';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

const controller = Controller({
  devtools: Devtools({
    host: 'localhost:8888',
  }),
  modules,
  providers: [
    FirebaseProvider({
      config: {
        apiKey: 'AIzaSyAn9hulrfDCwhzu66Mb6hJIbP9Z2TSo1T8',
        authDomain: 'gblog-f47ee.firebaseapp.com',
        databaseURL: 'https://gblog-f47ee.firebaseio.com',
        projectId: 'gblog-f47ee',
        storageBucket: 'gblog-f47ee.appspot.com',
        messagingSenderId: '298543710360',
      },
    }),
  ],
});

StyleSheet.rehydrate(window.renderedClassNames);

function renderApp(App, Child) {
  render(
    <Container controller={controller}><App><Child /></App></Container>,
    document.querySelector('#app')
  );
}

const urlMapper = UrlMapper();
const matchedRoute = urlMapper.map(location.pathname, {
  '/': function() {
    require.ensure([], () => {
      controller.getSignal('app.initialized')();
      renderApp(
        require('./components/App').default,
        require('./components/Tags').default
      );
    });
  },
  '/write': function() {
    require.ensure([], () => {
      controller.getSignal('app.initialized')();
      renderApp(
        require('./components/App').default,
        require('./components/WriteArticle').default
      );
    });
  },
  '/tags/:tag': function() {
    require.ensure([], () => {
      controller.getSignal('app.initialized')();
      renderApp(
        require('./components/App').default,
        require('./components/TagArticles').default
      );
    });
  },
  '/articles/:username/:article': function() {
    require.ensure([], params => {
      controller.getSignal('app.initialized')();
      renderApp(
        require('./components/App').default,
        require('./components/Article').default
      );
    });
  },
});

if (matchedRoute) {
  matchedRoute.match(matchedRoute.values);
}
