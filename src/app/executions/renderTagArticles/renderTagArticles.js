/** @jsx h */
import { h } from 'preact';
import TagArticles from '../../../client/components/TagArticles';
import tagArticlesStyles from '../../../client/components/TagArticles/styles.js';

function renderTagArticlesFactory(forceRender) {
  function renderTagArticles({ props, render }) {
    if (props.cache && !forceRender) {
      return { tagArticlesContent: props.cache };
    }

    const articles = Object.keys(props.articles || [])
      .reduce((allArticles, articleKey) => {
        return allArticles.concat(props.articles[articleKey]);
      }, [])
      .sort((articleA, articleB) => {
        if (articleA.publishDatetime > articleB.publishDatetime) {
          return -1;
        } else if (articleA.publishDatetime < articleB.publishDatetime) {
          return 1;
        }

        return 0;
      });

    return {
      tagArticlesContent: {
        html: render.component(<TagArticles articles={articles} />),
        style: tagArticlesStyles,
        content: articles.map(article => article.href),
      },
    };
  }

  return renderTagArticles;
}

export default renderTagArticlesFactory;
