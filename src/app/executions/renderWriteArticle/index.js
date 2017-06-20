import getSession from '../common/getSession';
import sendIndex from '../common/sendIndex';
import renderApp from '../common/renderApp';
import renderWriteArticle from './renderWriteArticle';
import renderIndex from './renderIndex';

/*
  When writing an article we always send the latest version of the draft
*/
export default [
  getSession,
  renderApp({
    isWriting: true,
  }),
  renderWriteArticle,
  renderIndex,
  sendIndex,
];
