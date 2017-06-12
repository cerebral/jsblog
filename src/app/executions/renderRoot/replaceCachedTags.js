function replaceCachedArticle({ props, cache }) {
  cache.set(props.req.path, {
    content: Object.keys(props.tags).join(','),
    html: props.tagsContent.html,
    script: props.tagsContent.script,
    style: props.tagsContent.style,
  });
}

export default replaceCachedArticle;
