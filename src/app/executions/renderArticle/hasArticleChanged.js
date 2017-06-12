function hasArticleChanged({ props, state, path }) {
  return props.cache.content === props.article.content
    ? path.false()
    : path.true();
}

export default hasArticleChanged;
