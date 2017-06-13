import firebase from 'firebase-admin';

const publishApp = firebase.initializeApp(
  {
    credential: firebase.credential.cert(
      JSON.parse(process.env.SERVICE_ACCOUNT)
    ),
    databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
  },
  'publish'
);

function publishArticle(event) {
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
              publishDatetime: Date.now(),
            }
      );

      return publishApp
        .database()
        .ref(`tagArticles/${dataValue.tag}/${dataValue.key}`)
        .update(update);
    });
}

function updateTag(event) {
  const dataValue = event.data.val();
  const previousValue = event.data.previous.val();

  console.log('Publishing TAG');
  return publishApp
    .database()
    .ref(`tags/${dataValue.tag}`)
    .transaction(maybeTag => {
      if (!maybeTag) {
        return {
          articleCount: 1,
          lastDatetime: Date.now(),
          readCount: 0,
        };
      }

      return Object.assign({}, maybeTag, {
        articleCount: previousValue
          ? maybeTag.articleCount
          : maybeTag.articleCount + 1,
        lastDatetime: previousValue ? maybeTag.lastDatetime : Date.now(),
      });
    });
}

function publish(event) {
  console.log('Publishing');
  return updateTag(event)
    .then(() => {
      return publishArticle(event);
    })
    .catch(error => {
      console.log('Publishing error', error);
    });
}

export default publish;
