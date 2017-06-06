import React from 'react';
import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';
import { css } from 'aphrodite';
import styles from './styles';

export default connect(
  {
    articles: state`app.articles`,
  },
  function TagArticles({ articles }) {
    return (
      <div className={css(styles.wrapper)}>
        <table className={css(styles.table)}>
          <thead>
            <tr>
              <th className={css(styles.th)}>published</th>
              <th className={css(styles.th)}>title</th>
              <th className={css(styles.th)}>author</th>
              <th className={css(styles.th)}>reads</th>
              <th className={css(styles.th)}>recommended</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) =>
              <tr key={index} className={css(styles.tr)}>
                <td className={css(styles.td, styles.datetime)}>
                  {new Date(article.datetime)
                    .toUTCString()
                    .split(' ')
                    .slice(0, 3)
                    .join(' ')}
                </td>
                <td className={css(styles.td, styles.title)}>
                  <a className={css(styles.titleLink)} href={article.href}>
                    {article.title}
                  </a>
                </td>
                <td className={css(styles.td, styles.author)}>
                  {article.author}
                </td>
                <td className={css(styles.td, styles.readCount)}>
                  {article.readCount}
                </td>
                <td className={css(styles.td, styles.recommendationCount)}>
                  {article.recommendationCount}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);
