export default `
  .Drafts-wrapper {
    padding: 50px 0;
    flex: 0 1 800px;
  }
  @media (max-width: 1024px) {
    .Drafts-wrapper {
      padding: 100px 0 50px 0;
      flex: 1;
    }
  }
  .Drafts-table {
    width: 100%;
  }
  .Drafts-table tbody tr {
    cursor: pointer;
  }
  .Drafts-table tbody tr:hover td {
    opacity: 1;
  }
  .Drafts-table td {
    padding: 5px 10px;
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
  .Drafts-datetime {
    font-size: 14px;
  }
  .Drafts-title {
    font-size: 20px;
  }
  .Drafts-title {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`;
