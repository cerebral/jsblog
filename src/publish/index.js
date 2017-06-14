export default function(admin) {
  function publishArticle(event) {
    const dataValue = event.data.val();
    const previousValue = event.data.previous.val();

    return admin
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

        return admin
          .database()
          .ref(`tagArticles/${dataValue.tag}/${dataValue.key}`)
          .update(update);
      });
  }

  function updateTag(event) {
    const dataValue = event.data.val();
    const previousValue = event.data.previous.val();

    return admin
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

  return function publish(event) {
    return updateTag(event)
      .then(() => {
        return publishArticle(event);
      })
      .catch(error => {
        console.log('Publishing error', error);
      });
  };
}
