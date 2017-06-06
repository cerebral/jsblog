import React from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';
import { css } from 'aphrodite';
import styles from './styles';
import PropTypes from 'prop-types';

export default connect(
  {
    isLoggedIn: state`app.isLoggedIn`,
  },
  Write
);

function Write({ isLoggedIn }, { theme }) {
  return (
    <a
      className={css(
        styles.button,
        isLoggedIn && styles.visible,
        theme.Write.button
      )}
      href="/write"
    >
      Write
    </a>
  );
}

Write.contextTypes = {
  theme: PropTypes.object.isRequired,
};
