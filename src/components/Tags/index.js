import React from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';
import { css } from 'aphrodite';
import styles from './styles';
import { TagCloud } from 'react-tagcloud';

const data = [
  { value: 'mongodb', count: 18 },
  { value: 'javascript', count: 38 },
  { value: 'react', count: 30 },
  { value: 'nodejs', count: 28 },
  { value: 'expressjs', count: 25 },
  { value: 'html5', count: 33 },
  { value: 'css3', count: 20 },
  { value: 'webpack', count: 22 },
  { value: 'babeljs', count: 7 },
  { value: 'ecmascript', count: 25 },
  { value: 'jest', count: 15 },
  { value: 'mocha', count: 17 },
  { value: 'reactnative', count: 27 },
  { value: 'angularjs', count: 30 },
  { value: 'typescript', count: 15 },
  { value: 'flow', count: 30 },
  { value: 'npm', count: 11 },
];

function customRenderer(tag, size, color) {
  return (
    <a
      href={`/tags/${tag.value}`}
      key={tag.value}
      className={css(styles.tag)}
      style={{ fontSize: `${size}px` }}
    >
      {tag.value}
    </a>
  );
}

export default connect(
  {
    isLoggingIn: state`app.isLoggingIn`,
    user: state`app.user`,
    loginClicked: signal`app.loginClicked`,
  },
  function Tags({ user, isLoggingIn, loginClicked }) {
    return (
      <div className={css(styles.wrapper)}>
        <TagCloud
          minSize={12}
          maxSize={35}
          shuffle={false}
          disableRandomColor
          tags={data}
          renderer={customRenderer}
        />
      </div>
    );
  }
);
