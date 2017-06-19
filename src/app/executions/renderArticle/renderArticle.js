/** @jsx h */
import { h } from 'preact';
import Article from '../../../client/components/Article';
import highlightStyles from '../../../client/components/Article/highlight.styles.js';
import articleStyles from '../../../client/components/Article/styles.js';

function renderArticleFactory(forceRender) {
  function renderArticle({ props, render }) {
    if (props.cache && !forceRender) {
      return { articleContent: props.cache };
    }

    return {
      articleContent: {
        html: render.component(
          <Article
            article={props.article}
            login={props.req.params.displayName}
          />
        ),
        style: `${highlightStyles}\n${articleStyles}`,
        title: props.article.title,
      },
    };
  }

  return renderArticle;
}

export default renderArticleFactory;
