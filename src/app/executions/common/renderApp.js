/** @jsx h */
import { h } from 'preact';
import App from '../../../client/components/App';
import style from '../../../client/components/App/styles';

function renderAppFactory(props) {
  function renderApp({ props, render }) {
    return {
      appContent: {
        html: render.component(<App user={props.user} />),
        style,
      },
    };
  }

  return renderApp;
}

export default renderAppFactory;
