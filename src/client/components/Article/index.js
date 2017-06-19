/** @jsx h */
import { h, Component } from 'preact';
import { compileArticle } from '../../../utils';

function Article(props) {
  return (
    <article id={props.article.key} className="Article-content">
      {
        compileArticle(props.article.content, {
          login: props.login,
          article: props.article,
        }).tree
      }
    </article>
  );
}

export default Article;
