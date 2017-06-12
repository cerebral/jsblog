function renderIndex({ props, render }) {
  return {
    index: render.index({
      appHtml: props.appContent.html,
      pageHtml: props.tagsContent.html,
      styles: [props.appContent.style, props.tagsContent.style],
      theme: 'hund',
      useDroidSansMono: false,
    }),
  };
}

export default renderIndex;
