function hasTagsChanged({ props, state, path }) {
  return props.cache.content === Object.keys(props.tags || []).join(',')
    ? path.false()
    : path.true();
}

export default hasTagsChanged;
