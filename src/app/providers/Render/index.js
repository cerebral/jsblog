import config from '../../../../app.config.json';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { UniversalController } from 'cerebral';
import { Container } from 'cerebral/react';
import * as modules from '../../../modules';
import { StyleSheetServer } from 'aphrodite';
import highlightCss from './highlight.css.js';
import App from '../../../components/App';
import themes from '../../../components/App/themes';

function render(child, tree = [], options = {}) {
  const controller = UniversalController({
    modules,
  });

  return controller.run(tree).then(() => {
    const { html, css } = StyleSheetServer.renderStatic(() => {
      return renderToString(
        <Container controller={controller}><App>{child}</App></Container>
      );
    });
    const script = controller.getScript();
    const theme = controller.getState('app.theme');

    return `<!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body, #app {
            margin: 0;
            height: 100%;
            font-family: ${options.defaultFont
              ? 'monospace'
              : '"Droid Sans Mono"'};
            -webkit-font-smoothing: antialiased;
          }
          @font-face {
            font-family: 'Droid Sans Mono';
            font-style: normal;
            font-weight: 400;
            src: local('Droid Sans Mono'), local('DroidSansMono'), url(data:application/x-font-woff;charset=utf-8;base64,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) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
          }
        </style>
        <style data-aphrodite>${css.content}</style>
        <style>${highlightCss(themes[theme].highlight)}</style>
        ${script}
      </head>
      <body class="font-not-loaded">
        <div id="app">${html}</div>
        <script>window.renderedClassNames = ${JSON.stringify(
          css.renderedClassNames
        )};</script>
        ${config[process.env.NODE_ENV || 'development'].scripts
          .map(script => `<script src="/${script}"></script>`)
          .join('\n')}
      </body>
    </html>`;
  });
}

function Render(context) {
  context.render = render;

  return context;
}

export default Render;
