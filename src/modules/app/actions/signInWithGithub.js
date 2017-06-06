function signInWithGithub({ firebase }) {
  return firebase
    .signInWithGithub({})
    .then(response => ({ user: response.user }));
}

export default signInWithGithub;
