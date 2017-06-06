import React from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';
import { css } from 'aphrodite';
import styles from './styles';
import Textarea from 'react-textarea-autosize';
import { compileArticle } from '../../utils';

export default connect(
  {
    value: state`app.writeArticleValue`,
    valueChanged: signal`app.writeArticleValueChanged`,
  },
  function WriteArticle({ value, valueChanged }) {
    return (
      <div className={css(styles.wrapper)}>
        <Textarea
          autoFocus
          value={value}
          className={css(styles.textarea)}
          onChange={event => valueChanged({ value: event.target.value })}
        />
        <div className={css(styles.preview)}>{compileArticle(value).tree}</div>
      </div>
    );
  }
);
