import React from 'react';
import { css } from 'aphrodite';
import styles from './styles';
import PropTypes from 'prop-types';

function Logo(props, { theme }) {
  return (
    <a href="/" className={css(styles.wrapper)}>
      <div className={css(styles.jsWrapper, theme.Logo.jsWrapper)}>
        JS
      </div>
      <div className={css(styles.blogWrapper, theme.Logo.blogWrapper)}>
        BLOG
      </div>
    </a>
  );
}

Logo.contextTypes = {
  theme: PropTypes.object.isRequired,
};

export default Logo;
