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
    text-align: left;
    font-size: 3em;
    opacity: 0.5;
  }
  .Article-content h2 {
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
    font-size: 2em;
    opacity: 0.5;
  }
  .Article-content h3 {
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
    font-size: 1.5em;
    opacity: 0.5;
  }
  .Article-content p {
    line-height: 1.5em;
  }
  .Article-content code {
    padding: 2px 5px;
  }
  .Article-content code.hljs {
    padding: 15px;
  }
  .Article-content strong {
    font-size: 1.1em;
  }
  .Article-content .Component-Twitter {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
  }
  .Article-content .Component-Twitter.Component-Twitter-hash {
    display: inline;
    font-size: 1em;
  }
  @media (max-width: 1024px) {
    .Article-content .Component-Twitter {
      font-size: 1em;
    }
    .Article-content .Component-Twitter.Component-Twitter-hash {
      font-size: 0.75em;
    }
  }
  .Article-content .Component-Twitter.Component-Twitter-hash:not(:last-child) {
    margin-right: 5px;
  }
`;
