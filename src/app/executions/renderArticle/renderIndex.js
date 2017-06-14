function renderIndex({ props, render }) {
  return {
    index: render.index({
      appHtml: props.appContent.html,
      pageHtml: props.articleContent.html,
      styles: [props.appContent.style, props.articleContent.style],
      user: props.user,
      useDroidSansMono: true,
      bodyClass: 'page-Article',
    }),
  };
}

export default renderIndex;
