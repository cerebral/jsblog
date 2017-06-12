function hasCachedPath({ props, cache, path }) {
  const cachedValue = cache.get(props.req.path);
  return cachedValue ? path.true({ cache: cachedValue }) : path.false();
}

export default hasCachedPath;
