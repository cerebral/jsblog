export default `
  .TagArticles-wrapper {
    padding: 50px 0;
  }
  .TagArticles-table {
    border-collapse: collapse;
  }
  .TagArticles-table th {
    text-align: left;
    padding: 5px;
  }
  .TagArticles-table tbody tr {
    border: 1px solid rgb(175, 198, 199);
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
  .TagArticles-title a {
    color: inherit;
    text-decoration: none;
  }
  .TagArticles-readCount {
    font-size: 18px;
    text-align: right;
  }
  .TagArticles-recommendedCount {
    font-size: 18px;
    text-align: right;
  }
`;
