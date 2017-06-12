export default `
  .Tags-wrapper {
    flex: 0 1 800px;
    display: flex;
    align-items: center;
    height: 100vh;
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
  .Tags-tag:hover {
    opacity: 0.8;
  }
`;
