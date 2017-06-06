import './prism';
import React from 'react';
import { connect } from 'cerebral/react';
import { state } from 'cerebral/tags';
import { css } from 'aphrodite';
import styles from './styles';
import Logo from '../Logo';
import Login from '../Login';
import Write from '../Write';
import themes from './themes';
import PropTypes from 'prop-types';

class App extends React.Component {
  getChildContext() {
    return { theme: themes[this.props.theme] };
  }
  render() {
    return (
      <div
        className={css(styles.wrapper, themes[this.props.theme].App.wrapper)}
      >
        <Logo />
        <div className={css(styles.contentWrapper)}>{this.props.children}</div>
        <Write />
        <Login />
      </div>
    );
  }
}

App.childContextTypes = {
  theme: PropTypes.object.isRequired,
};

export default connect(
  {
    title: state`app.title`,
    theme: state`app.theme`,
  },
  App
);
