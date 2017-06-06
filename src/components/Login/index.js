import React from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';
import { css } from 'aphrodite';
import styles from './styles';
import PropTypes from 'prop-types';

export default connect(
  {
    isChangingAuthentication: state`app.isChangingAuthentication`,
    isLoggedIn: state`app.isLoggedIn`,
    loginClicked: signal`app.loginClicked`,
  },
  Login
);

function Login(
  { isLoggedIn, isChangingAuthentication, loginClicked },
  { theme }
) {
  return (
    <a
      onClick={() => loginClicked()}
      className={css(
        styles.button,
        isChangingAuthentication && styles.loading,
        theme.Login.button
      )}
    >
      {isChangingAuthentication ? null : isLoggedIn ? 'Log out' : 'Log in'}
    </a>
  );
}

Login.contextTypes = {
  theme: PropTypes.object.isRequired,
};
