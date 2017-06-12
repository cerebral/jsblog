/** @jsx h */
import { h, Component } from 'preact';
import hljs from 'highlight.js/lib/highlight';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsXml from 'highlight.js/lib/languages/xml';
import hljsCss from 'highlight.js/lib/languages/css';
import marksy from 'marksy';

hljs.registerLanguage('javascript', hljsJavascript);
hljs.registerLanguage('xml', hljsXml);
hljs.registerLanguage('css', hljsCss);

export const compile = marksy({
  createElement: h,
  highlight: hljs,
});

export function compileArticle(content) {
  return compile(content);
}
