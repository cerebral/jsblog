function getSession({ props, firebase }) {
  const req = props.req;
  const session = req.cookies.jsblog ? JSON.parse(req.cookies.jsblog) : null;

  return { session };
}

export default getSession;
