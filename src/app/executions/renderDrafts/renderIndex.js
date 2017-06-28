function renderIndex({ props, render }) {
  return {
    index: render.index({
      title: `JSBlog - drafts`,
      appHtml: props.appContent.html,
      pageHtml: props.draftsContent.html,
      styles: [props.appContent.style, props.draftsContent.style],
      user: props.user,
      useDroidSansMono: true,
      bodyClass: 'page-Drafts',
    }),
  };
}

export default renderIndex;
