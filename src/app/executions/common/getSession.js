import admin from 'firebase-admin';

function getSession({ props, firebase }) {
  const token = props.req.cookies.__session || null;

  if (token) {
    return firebase
      .verifyIdToken(token)
      .then(decodedToken => {
        return decodedToken && admin.auth().getUser(decodedToken.uid);
      })
      .then(user => {
        console.log('User', user);
        return { user: user || null };
      })
      .catch(error => {
        console.log('Could not get user', error);
        return { user: null };
      });
  } else {
    return { user: null };
  }
}

export default getSession;
