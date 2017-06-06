import hljs from 'highlight.js/lib/highlight';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsXml from 'highlight.js/lib/languages/xml';
import hljsCss from 'highlight.js/lib/languages/css';
import React from 'react';
import marksy from 'marksy';
import { css } from 'aphrodite';
import styles from './utils.styles';

hljs.registerLanguage('javascript', hljsJavascript);
hljs.registerLanguage('xml', hljsXml);
hljs.registerLanguage('css', hljsCss);

const compile = marksy({
  highlight: hljs,
  h1({ children }) {
    return <h1 className={css(styles.h1)}>{children}</h1>;
  },
  h2({ children }) {
    return <h2 className={css(styles.h2)}>{children}</h2>;
  },
  h3({ children }) {
    return <h3 className={css(styles.h3)}>{children}</h3>;
  },
  p({ children }) {
    return <p className={css(styles.p)}>{children}</p>;
  },
  li({ children }) {
    return <li className={css(styles.li)}>{children}</li>;
  },
  strong({ children }) {
    return <strong className={css(styles.strong)}>{children}</strong>;
  },
});

export function compileArticle(content) {
  return compile(content);
}
