import config from 'config';
import renderToString from 'preact-render-to-string';
import DroidSansMono from './DroidSansMono.font';
import defaultTheme from '../../../themes/default';
import codesandbox from '../../../themes/codesandbox';
import { parseDisplayName } from '../../../utils';

const themes = { default: defaultTheme, codesandbox };

/*
  A provider that renders the "index" or a specific "component".
  It populates the index with options passed in
*/
const render = {
  index(options) {
    const theme =
      themes[options.user ? parseDisplayName(options.user).theme : 'default'];

    return `<!DOCTYPE html>
      <html>
        <head>
          <title>${options.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="theme-color" content="${theme.color}">
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
          <!-- THEME_CONTENT_START -->
          <style>${theme.style}</style>
          <!-- THEME_CONTENT_END -->
          ${options.useDroidSansMono ? `<style>${DroidSansMono}</style>` : ''}
          ${options.prefetch
            ? `<script>window.PREFETCHES = ${JSON.stringify(
                options.prefetch
              )};</script>`
            : ''}
        </head>
        <body class="${options.bodyClass}">
          <!-- PAGE_CONTENT_START -->
          <div id="page">${options.pageHtml}</div>
          <!-- PAGE_CONTENT_END -->
          <div id="app">${options.appHtml}</div>
          <!-- APP_SCRIPTS_START -->
          ${config.scripts
            .map(script => `<script src="/${script}" defer></script>`)
            .join('\n')}
          <!-- APP_SCRIPTS_END -->
            <script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-101108946-1', 'auto');
              ga('send', 'pageview');

            </script>
            <script>
              var disqusContainer = document.querySelector('#disqus_thread')

              if (disqusContainer) {
                var disqus_config = function () {
                  this.page.url = location.href;
                  this.page.identifier = location.pathname;
                };

                (function() {
                  var d = document, s = d.createElement('script');
                  s.src = 'https://' + disqusContainer.getAttribute('data-name') + '.disqus.com/embed.js';
                  s.setAttribute('data-timestamp', +new Date());
                  (d.head || d.body).appendChild(s);
                })();
              }
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
