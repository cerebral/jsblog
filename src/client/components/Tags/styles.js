export default `
  .Tags-wrapper {
    flex: 0 1 800px;
    display: flex;
    align-items: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  @media (max-width: 1024px) {
    .Tags-wrapper {
      flex: 1;
      flex-wrap: wrap;
    }
  }
  .Tags-tag {
    display: inline-block;
    vertical-align: middle;
    margin: 0 3px;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
    color: inherit;
    text-decoration: none;
    margin: 5px;
  }
  @media (max-width: 1024px) {
    .Tags-tag {

    }
  }
  .Tags-tag:hover {
    opacity: 0.8;
  }
`;
