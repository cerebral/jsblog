export default colors => {
  return `
  /*

  github.com style (c) Vasily Polovnyov <vast@whiteants.net>

  */

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
    font-family: "Droid Sans Mono";
    color: ${colors.default};
    background: transparent;
  }

  .hljs-comment,
  .hljs-quote {
    color: ${colors.comment};
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: ${colors.keyword};
    font-weight: bold;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: ${colors.variable};
  }

  .hljs-string,
  .hljs-doctag {
    color: ${colors.string};
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    font-weight: bold;
  }

  .hljs-subst {
    font-weight: normal;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: ${colors.type};
    font-weight: bold;
  }

  .hljs-tag,
  .hljs-name,
  .hljs-attribute {
    color: ${colors.tag};
    font-weight: normal;
  }

  .hljs-regexp,
  .hljs-link {
    color: ${colors.regexp};
  }

  .hljs-symbol,
  .hljs-bullet {
    color: ${colors.symbol};
  }

  .hljs-built_in,
  .hljs-builtin-name {
    color: color: ${colors.built_in};
  }

  .hljs-meta {
    color: ${colors.meta};
    font-weight: bold;
  }

  .hljs-deletion {
    background: #fdd;
  }

  .hljs-addition {
    background: #dfd;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  `;
};
