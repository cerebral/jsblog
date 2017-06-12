/** @jsx h */
import { h } from 'preact';
import WriteArticle from '../../../client/components/WriteArticle';
import highlightStyles from '../../../client/components/Article/highlight.styles.js';
import writeArticleStyles from '../../../client/components/WriteArticle/styles.js';

function renderWriteArticle({ props }) {
  return {
    writeArticleContent: {
      html: '',
      style: `${highlightStyles}\n${writeArticleStyles}`,
    },
  };
}

export default renderWriteArticle;
