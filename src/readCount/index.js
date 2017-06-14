import firebase from 'firebase-admin';

const readCountApp = firebase.initializeApp(
  {
    credential: firebase.credential.cert(
      JSON.parse(process.env.SERVICE_ACCOUNT)
    ),
    databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
  },
  'readCount'
);

function updateTagArticle(data) {
  return readCountApp
    .database()
    .ref(`tagArticles/${data.article.tag}/${data.article.key}/readCount`)
    .transaction(maybeReadCount => {
      if (!maybeReadCount) {
        return 1;
      }

      return maybeReadCount + 1;
    });
}

function updateTag(data) {
  return readCountApp
    .database()
    .ref(`tags/${data.article.tag}/readCount`)
    .transaction(maybeReadCount => {
      if (!maybeReadCount) {
        return 1;
      }

      return maybeReadCount + 1;
    });
}

function updateReadCount(event) {
  return readCountApp
    .database()
    .ref(`displayNames/byLogin/${event.params.displayName}`)
    .once('value')
    .then(snapshot => {
      const uid = snapshot.val();

      return firebase
        .database()
        .ref(`articles/${uid}/${event.params.articleName}`)
        .once('value')
        .then(snapshot => {
          return {
            article: snapshot.val(),
            uid,
          };
        });
    })
    .then(data => {
      return Promise.all([updateTagArticle(data), updateTag(data)]);
    })
    .catch(error => {
      console.log('Problems updating count!', error);
    });
}

export default updateReadCount;
