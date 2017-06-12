function getArticles({ props, firebase }) {
  return firebase
    .value(`tagArticles/${props.req.params.tag}`)
    .then(response => ({ articles: response.value }));
}

export default getArticles;
