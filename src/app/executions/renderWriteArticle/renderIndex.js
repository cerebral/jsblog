function renderIndex({ props, render }) {
  return {
    index: render.index({
      title: `JSBlog`,
      appHtml: props.appContent.html,
      pageHtml: props.writeArticleContent.html,
      styles: [props.appContent.style, props.writeArticleContent.style],
      user: props.user,
      useDroidSansMono: true,
      bodyClass: 'page-WriteArticle',
    }),
  };
}

export default renderIndex;
