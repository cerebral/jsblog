/** @jsx h */
import { h, Component } from 'preact';
import { compileArticle } from '../../../utils';

function Article({ article, login }) {
  return (
    <article id={article.key} className="Article-content">
      {
        compileArticle(article.content, {
          login,
        }).tree
      }
    </article>
  );
}

export default Article;
