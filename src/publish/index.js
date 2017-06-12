import firebase from 'firebase-admin';
import serviceAccount from 'serviceAccount';

const publishApp = firebase.initializeApp(
  {
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://gblog-f47ee.firebaseio.com',
  },
  'publish'
);

function publish(event) {
  const dataValue = event.data.val();
  const previousValue = event.data.previous.val();

  return publishApp
    .database()
    .ref(`displayNames/byUid/${event.data.ref.parent.key}`)
    .once('value', snapshot => {
      const displayName = snapshot.val();
      const update = Object.assign(
        {
          content: dataValue.content,
          datetime: dataValue.datetime,
          author: displayName,
          href: `/articles/${displayName}/${dataValue.articleName}`,
          title: dataValue.title,
        },
        previousValue
          ? {}
          : {
              readCount: 0,
              recommendedCount: 0,
              publishDatetime: Date.now(),
            }
      );

      return publishApp
        .database()
        .ref(`tagArticles/${dataValue.tag}/${dataValue.key}`)
        .update(update);
    });
}

export default publish;
