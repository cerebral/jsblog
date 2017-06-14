export default function(admin) {
  function updateTagArticle(data) {
    return admin
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
    return admin
      .database()
      .ref(`tags/${data.article.tag}/readCount`)
      .transaction(maybeReadCount => {
        if (!maybeReadCount) {
          return 1;
        }

        return maybeReadCount + 1;
      });
  }

  return function updateReadCount(event) {
    return admin
      .database()
      .ref(`displayNames/byLogin/${event.params.displayName}`)
      .once('value')
      .then(snapshot => {
        const uid = snapshot.val();

        return admin
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
  };
}
