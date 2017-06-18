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
  .Article-content code {
    padding: 2px 5px;
  }
  .Article-content strong {
    font-size: 1.1em;
  }
`;
