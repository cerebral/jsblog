/** @jsx h */
import { h } from 'preact';
import classnames from 'classnames';

function Login({ isLoggedIn, isChangingAuthentication, toggleLogin }) {
  return (
    <button
      onClick={toggleLogin}
      className={classnames('App-button', 'Login-button', {
        'App-button-loading': isChangingAuthentication,
      })}
    >
      {isChangingAuthentication ? null : isLoggedIn ? 'Log out' : 'Log in'}
    </button>
  );
}

export default Login;
