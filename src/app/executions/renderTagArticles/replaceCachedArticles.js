function replaceCachedArticles({ props, cache }) {
  cache.set(props.req.path, {
    content: Object.keys(props.articles).join(','),
    html: props.tagArticlesContent.html,
    style: props.tagArticlesContent.style,
  });
}

export default replaceCachedArticles;
