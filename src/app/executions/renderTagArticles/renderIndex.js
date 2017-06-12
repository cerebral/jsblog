function renderIndex({ props, render }) {
  return {
    index: render.index({
      appHtml: props.appContent.html,
      pageHtml: props.tagArticlesContent.html,
      styles: [props.appContent.style, props.tagArticlesContent.style],
      theme: 'hund',
      useDroidSansMono: true,
    }),
  };
}

export default renderIndex;
