import getSession from '../common/getSession';
import sendIndex from '../common/sendIndex';
import hasCachedPath from '../common/hasCachedPath';
import renderApp from '../common/renderApp';
import renderTags from './renderTags';
import renderIndex from './renderIndex';
import getTags from './getTags';
import replaceCachedTags from './replaceCachedTags';
import hasTagsChanged from './hasTagsChanged';

export default [
  getSession,
  hasCachedPath,
  {
    true: [
      renderApp(),
      renderTags,
      renderIndex,
      sendIndex,
      getTags,
      hasTagsChanged,
      {
        true: [renderTags, replaceCachedTags],
        false: [],
      },
    ],
    false: [
      getTags,
      renderApp(),
      renderTags,
      renderIndex,
      sendIndex,
      replaceCachedTags,
    ],
  },
];
