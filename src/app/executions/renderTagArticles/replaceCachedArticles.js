function replaceCachedArticles({ props, cache }) {
  cache.set(props.req.path, {
    content: Object.keys(props.articles || []).map(
      articleKey => props.articles[articleKey].href
    ),
    html: props.tagArticlesContent.html,
    style: props.tagArticlesContent.style,
  });
}

export default replaceCachedArticles;
