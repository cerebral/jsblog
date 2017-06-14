function hasTagArticlesChanged({ props, state, path }) {
  return props.cache.content.join(',') ===
    Object.keys(props.articles || [])
      .map(articleKey => props.articles[articleKey].href)
      .join(',')
    ? path.false()
    : path.true();
}

export default hasTagArticlesChanged;
