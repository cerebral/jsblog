export default `
  code[class*="language-"],
  pre[class*="language-"] {
    display: block;
    overflow-x: auto;
    font-family: "Droid Sans Mono";
    background: transparent;
  	text-align: left;
  	white-space: pre;
  	word-spacing: normal;
  	word-break: normal;
  	word-wrap: normal;
  	line-height: 1.5;

  	-moz-tab-size: 4;
  	-o-tab-size: 4;
  	tab-size: 4;

  	-webkit-hyphens: none;
  	-moz-hyphens: none;
  	-ms-hyphens: none;
  	hyphens: none;
  }

  code[class*="language-"] {
    padding: 20px !important;
  }

  .token.important,
  .token.bold {
  	font-weight: bold;
  }
  .token.italic {
  	font-style: italic;
  }

  .token.entity {
  	cursor: help;
  }
`;
