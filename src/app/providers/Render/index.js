import config from 'config';
import renderToString from 'preact-render-to-string';
import DroidSansMono from './DroidSansMono.font';
import hund from '../../../themes/hund';

const themes = { hund };
const render = {
  index(options) {
    return `<!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              margin: 0;
              font-family: monospace;
              -webkit-font-smoothing: antialiased;
              overflow-y: scroll;
            }
            #app {
              position: absolute;
            }
            #page {
              min-height: 100vh;
              display: flex;
              justify-content: center;
            }
          </style>
          <style>${(options.styles || []).join('\n')}</style>
          <style>${themes[options.theme]}</style>
          ${options.useDroidSansMono ? `<style>${DroidSansMono}</style>` : ''}
        </head>
        <body>
          <div id="page">${options.pageHtml}</div>
          <div id="app">${options.appHtml}</div>
          ${config.scripts
            .map(script => `<script src="/${script}" defer></script>`)
            .join('\n')}
        </body>
      </html>`;
  },
  component(component) {
    return renderToString(component);
  },
};

function Render(context) {
  context.render = render;

  return context;
}

export default Render;
