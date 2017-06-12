function getArticle({ props, firebase }) {
  return firebase
    .value(`articles/${props.uid}/${props.req.params.articleName}`)
    .then(response => ({ article: response.value }));
}

export default getArticle;
