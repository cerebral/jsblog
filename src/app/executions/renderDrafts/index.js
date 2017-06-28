import getSession from '../common/getSession';
import sendIndex from '../common/sendIndex';
import renderApp from '../common/renderApp';
import renderDrafts from './renderDrafts';
import renderIndex from './renderIndex';
import getDrafts from './getDrafts';

/*
  When rendering the tag articles we always update the cache with a new version after
  the response has been sent
*/
export default [
  getSession,
  getDrafts,
  renderApp(),
  renderDrafts,
  renderIndex,
  sendIndex,
];
