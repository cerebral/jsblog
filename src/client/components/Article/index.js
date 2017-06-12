/** @jsx h */
import { h, Component } from 'preact';
import { compileArticle } from '../../utils';

function Article({ article }) {
  return (
    <article className="Article-content">
      {compileArticle(article).tree}
    </article>
  );
}

export default Article;
