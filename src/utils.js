/** @jsx h */
import { h, Component } from 'preact';
import hljs from 'highlight.js/lib/highlight';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsXml from 'highlight.js/lib/languages/xml';
import hljsCss from 'highlight.js/lib/languages/css';
import marksy from 'marksy/components';
import ImageComponent from './marksy/Image';
import TwitterComponent from './marksy/Twitter';

hljs.registerLanguage('javascript', hljsJavascript);
hljs.registerLanguage('xml', hljsXml);
hljs.registerLanguage('css', hljsCss);

const storageBucket = JSON.parse(process.env.FIREBASE_CONFIG).storageBucket;

export const compile = marksy({
  createElement: h,
  highlight: hljs,
  components: { Image: ImageComponent, Twitter: TwitterComponent },
  elements: {
    img({ src, alt, context }) {
      const login = context.login;
      let url = src;
      if (src.substr(0, 4) !== 'http') {
        url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(
          `${login}/${src}`
        )}?alt=media`;
      }

      return <img src={url} alt={alt} />;
    },
    li({ children }) {
      return <li><span>{children}</span></li>;
    },
  },
});

export function compileArticle(content, context) {
  return compile(content, {}, context);
}

export function updateDisplayNameWithTheme(displayName, theme) {
  const parsed = displayName.split(',');

  return `${parsed[0]},${theme}`;
}

export function parseDisplayName(user) {
  const parsed = (user.displayName || user.name).split(',');

  return { login: parsed[0], theme: parsed[1] };
}
