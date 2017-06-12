import getSession from '../common/getSession';
import sendIndex from '../common/sendIndex';
import hasCachedPath from '../common/hasCachedPath';
import renderApp from '../common/renderApp';
import renderArticles from './renderArticles';
import renderIndex from './renderIndex';
import getArticles from './getArticles';
import replaceCachedArticles from './replaceCachedArticles';
import hasArticlesChanged from './hasArticlesChanged';

export default [
  getSession,
  hasCachedPath,
  {
    true: [
      renderApp(),
      renderArticles,
      renderIndex,
      sendIndex,
      getArticles,
      hasArticlesChanged,
      {
        true: [renderArticles, replaceCachedArticles],
        false: [],
      },
    ],
    false: [
      getArticles,
      renderApp(),
      renderArticles,
      renderIndex,
      sendIndex,
      replaceCachedArticles,
    ],
  },
];
