function hasTagArticlesChanged({ props, state, path }) {
  return props.cache.content === Object.keys(props.articles).join(',')
    ? path.false()
    : path.true();
}

export default hasTagArticlesChanged;
