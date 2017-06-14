export default `
  .TagArticles-wrapper {
    padding: 50px 0;
    flex: 0 1 800px;
  }
  @media (max-width: 1024px) {
    .TagArticles-wrapper {
      padding: 100px 0 50px 0;
      flex: 1;
    }
  }
  .TagArticles-table {
    width: 100%;
  }
  .TagArticles-table tbody tr {
    cursor: pointer;
  }
  .TagArticles-table tbody tr:hover td {
    opacity: 1;
  }
  .TagArticles-table td {
    padding: 5px 10px;
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
  .TagArticles-datetime {
    font-size: 14px;
  }
  .TagArticles-title {
    font-size: 20px;
  }
  .TagArticles-title {
    display: block;
    color: inherit;
    text-decoration: none;
  }
  .TagArticles-readCount {
    font-size: 14px;
  }
`;
