function hasTagsChanged({ props, state, path }) {
  return props.cache.content.map(tag => tag.value).join(',') ===
    Object.keys(props.tags || [])
      .map(tagKey => props.tags[tagKey].value)
      .join(',')
    ? path.false()
    : path.true();
}

export default hasTagsChanged;
