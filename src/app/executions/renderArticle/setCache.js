function setCache({ props, cache }) {
  cache.set(props.req.path, {
    title: props.article.title,
    content: props.article.content,
    html: props.articleContent.html,
    script: props.articleContent.script,
    style: props.articleContent.style,
  });
}

export default setCache;
