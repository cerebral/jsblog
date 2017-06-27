/** @jsx h */
import { h, Component } from 'preact';
import Prism from 'prismjs';
import prismJsx from './prismJsx';
import marksy from 'marksy/components';
import ImageComponent from './marksy/Image';
import TwitterComponent from './marksy/Twitter';
import YoutubeComponent from './marksy/Youtube';
import CodesandboxComponent from './marksy/Codesandbox';

prismJsx(Prism);

const storageBucket = JSON.parse(process.env.FIREBASE_CONFIG).storageBucket;

export const compile = marksy({
  createElement: h,
  highlight(language, code) {
    return Prism.highlight(code, Prism.languages[language]);
  },
  components: {
    Image: ImageComponent,
    Twitter: TwitterComponent,
    Youtube: YoutubeComponent,
    Codesandbox: CodesandboxComponent,
  },
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
    h2({ id, children }) {
      return (
        <h2 id={id}>
          <a className="Article-HeaderLink" href={`#${id}`}>
            {children}
          </a>
        </h2>
      );
    },
    h3({ id, children }) {
      return (
        <h3 id={id}>
          <a className="Article-HeaderLink" href={`#${id}`}>
            {children}
          </a>
        </h3>
      );
    },
    h4({ id, children }) {
      return (
        <h4 id={id}>
          <a className="Article-HeaderLink" href={`#${id}`}>
            {children}
          </a>
        </h4>
      );
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
