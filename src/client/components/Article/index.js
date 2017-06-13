/** @jsx h */
import { h, Component } from 'preact';
import { compileArticle } from '../../../utils';

function Article({ article }) {
  return (
    <article id={article.key} className="Article-content">
      {compileArticle(article.content).tree}
    </article>
  );
}

export default Article;
