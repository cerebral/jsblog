export default `
  .Article-content {
    flex: 0 1 800px;
    text-align: justify;
    font-family: "Droid Sans Mono";
  }
  @media (max-width: 1024px) {
    .Article-content {
      padding: 50px 20px 20px 20px;
      flex: none;
      width: 100%;
      box-sizing: border-box;
      text-align: initial;
    }
  }
  .Article-content h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3em;
    opacity: 0.5;
  }
  .Article-content h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2em;
    opacity: 0.5;
  }
  .Article-content h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5em;
    opacity: 0.5;
  }
  .Article-content p {
    line-height: 1.5em;
  }
  .Article-content ul, .Article-content ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .Article-content li {
    margin-bottom: 1em;
    padding-left: 1em;
    text-indent: -.7em;
  }
  .Article-content li p {
    display: inline;
  }
  .Article-content ul li::before {
    content: "• ";
  }
  .Article-content ol { counter-reset: item; }
  .Article-content ol li { display: block; }
  .Article-content ol li:before {
      content: counter(item) ". ";
      counter-increment: item;
  }
  .Article-content strong {
    font-size: 1.1em;
  }
`;
