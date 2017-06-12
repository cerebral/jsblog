import getSession from '../common/getSession';
import sendIndex from '../common/sendIndex';
import renderApp from '../common/renderApp';
import renderWriteArticle from './renderWriteArticle';
import renderIndex from './renderIndex';

export default [
  getSession,
  renderApp({
    isWriting: true,
  }),
  renderWriteArticle,
  renderIndex,
  sendIndex,
];
