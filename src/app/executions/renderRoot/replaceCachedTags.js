function replaceCachedArticle({ props, cache }) {
  cache.set(props.req.path, {
    content: props.tags || [],
    html: props.tagsContent.html,
    script: props.tagsContent.script,
    style: props.tagsContent.style,
  });
}

export default replaceCachedArticle;
