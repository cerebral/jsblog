import React from 'react';
import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';
import { css } from 'aphrodite';
import styles from './styles';
import { compileArticle } from '../../utils';

export default connect(
  {
    article: state`app.article`,
  },
  function Article({ article }) {
    return (
      <article className={css(styles.articleContent)}>
        {compileArticle(article).tree}
      </article>
    );
  }
);
