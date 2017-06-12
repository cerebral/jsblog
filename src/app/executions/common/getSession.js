function getSession({ props, firebase }) {
  const token = props.req.cookies.__session || null;

  if (token) {
    return firebase
      .verifyIdToken(token)
      .then(decodedToken => {
        return { user: decodedToken || null };
      })
      .catch(() => {
        return { user: null };
      });
  } else {
    return { user: null };
  }
}

export default getSession;
