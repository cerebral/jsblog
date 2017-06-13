function renderIndex({ props, render }) {
  return {
    index: render.index({
      appHtml: props.appContent.html,
      pageHtml: props.tagsContent.html,
      styles: [props.appContent.style, props.tagsContent.style],
      user: props.user,
      useDroidSansMono: false,
    }),
  };
}

export default renderIndex;
