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
  return firebase
    .database()
    .ref(`tagArticles/${data.article.tag}/${data.article.key}`)
    .transaction(maybeTagArticle => {
      if (!maybeTagArticle) {
        return null;
      }

      return Object.assign({}, maybeTagArticle, {
        readCount: maybeTagArticle.readCount + 1,
      });
    });
}

function updateTag(data) {
  return firebase
    .database()
    .ref(`tags/${data.article.tag}`)
    .transaction(maybeTag => {
      if (!maybeTag) {
        return null;
      }

      return Object.assign({}, maybeTag, {
        readCount: maybeTag.readCount + 1,
      });
    });
}

function updateReadCount(event) {
  return firebase
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
