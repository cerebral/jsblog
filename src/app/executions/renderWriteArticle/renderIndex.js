function renderIndex({ props, render }) {
  return {
    index: render.index({
      appHtml: props.appContent.html,
      pageHtml: props.writeArticleContent.html,
      styles: [props.appContent.style, props.writeArticleContent.style],
      theme: 'hund',
      useDroidSansMono: true,
    }),
  };
}

export default renderIndex;
