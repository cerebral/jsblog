/** @jsx h */
import { h } from 'preact';
import TagArticles from '../../../client/components/TagArticles';
import tagArticlesStyles from '../../../client/components/TagArticles/styles.js';

function renderTagArticlesFactory(forceRender) {
  function renderTagArticles({ props, render }) {
    if (props.cache && !forceRender) {
      return { tagArticlesContent: props.cache };
    }

    const articles = Object.keys(
      props.articles || []
    ).reduce((allArticles, articleKey) => {
      return allArticles.concat(props.articles[articleKey]);
    }, []);

    return {
      tagArticlesContent: {
        html: render.component(<TagArticles articles={articles} />),
        style: tagArticlesStyles,
      },
    };
  }

  return renderTagArticles;
}

export default renderTagArticlesFactory;
