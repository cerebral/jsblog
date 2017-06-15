import config from 'config';
import renderToString from 'preact-render-to-string';
import DroidSansMono from './DroidSansMono.font';
import hund from '../../../themes/hund';
import mostlyBright from '../../../themes/mostly-bright';
import { parseDisplayName } from '../../../utils';

const themes = { hund, 'mostly-bright': mostlyBright };

const render = {
  index(options) {
    return `<!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="manifest" href="/manifest.json">
          <link rel="icon" href="/logo_48x48.png">
          <style>
            body {
              margin: 0;
              font-family: monospace;
              -webkit-font-smoothing: antialiased;
              overflow-y: scroll;
            }
            #app {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
            #page {
              min-height: 100vh;
              display: flex;
              justify-content: center;
            }
          </style>
          <style>${(options.styles || []).join('\n')}</style>
          <style>${themes[
            options.user ? parseDisplayName(options.user).theme : 'hund'
          ]}</style>
          ${options.useDroidSansMono ? `<style>${DroidSansMono}</style>` : ''}
          ${(options.prefetch || [])
            .map(prefetch => {
              return `<link rel="prefetch" href="${prefetch}">`;
            })
            .join('\n')}
        </head>
        <body class="${options.bodyClass}">
          <div id="page">${options.pageHtml}</div>
          <div id="app">${options.appHtml}</div>
          ${config.scripts
            .map(script => `<script src="/${script}" defer></script>`)
            .join('\n')}
            <script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-101108946-1', 'auto');
              ga('send', 'pageview');

            </script>
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
