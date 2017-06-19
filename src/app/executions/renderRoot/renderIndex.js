function renderIndex({ props, render }) {
  return {
    index: render.index({
      title: 'JSBlog',
      appHtml: props.appContent.html,
      pageHtml: props.tagsContent.html,
      styles: [props.appContent.style, props.tagsContent.style],
      user: props.user,
      useDroidSansMono: false,
      bodyClass: 'page-Root',
      prefetch: props.tagsContent.content.slice(0, 3).map(tag => {
        return `/tags/${tag.value}`;
      }),
    }),
  };
}

export default renderIndex;
