import firebase from 'firebase';

export default {
  signIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const accessToken = result.credential.accessToken;
        const headers = new Headers();
        headers.append('Authorization', `token ${accessToken}`);

        return fetch(
          `https://api.github.com/user/${result.user.providerData[0].uid}`,
          {
            headers,
          }
        )
          .then(response => response.json())
          .then(data => {
            const login = data.login;

            if (result.user.displayName === data.login) {
              return result.user;
            }

            const currentUser = firebase.auth().currentUser;
            return Promise.all([
              currentUser.updateProfile({
                displayName: login,
              }),
              firebase
                .database()
                .ref(`displayNames/byLogin/${login}`)
                .set(result.user.uid),
              firebase
                .database()
                .ref(`displayNames/byUid/${result.user.uid}`)
                .set(login),
            ]).then(() => {
              return Object.assign({}, result.user, { displayName: login });
            });
          });
      })
      .then(user => {
        return this.getToken().then(token => ({ token, user }));
      })
      .then(result => {
        this.writeCookie(result.token);
        this.clearCache();

        return result.user;
      });
  },
  signOut() {
    return firebase.auth().signOut().then(() => {
      this.clearCache();
    });
  },
  getToken() {
    return firebase.auth().currentUser.getToken(false);
  },
  writeCookie(token) {
    document.cookie = `__session=${token}; max-age=3600; path=/`;
  },
  eraseCookie() {
    document.cookie = `__session=INVALID; max-age=0; path=/`;
  },
  clearCache() {
    navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        JSON.stringify({ type: 'reset' })
      );
  },
};
