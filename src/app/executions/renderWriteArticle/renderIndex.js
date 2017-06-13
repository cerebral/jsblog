function renderIndex({ props, render }) {
  return {
    index: render.index({
      appHtml: props.appContent.html,
      pageHtml: props.writeArticleContent.html,
      styles: [props.appContent.style, props.writeArticleContent.style],
      user: props.user,
      useDroidSansMono: true,
    }),
  };
}

export default renderIndex;
