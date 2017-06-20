export default function(admin) {
  /*
    Puts the published article into its related tag articles
  */
  function publishArticle(event, displayName) {
    const dataValue = event.data.val();
    const previousValue = event.data.previous.val();

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
  }

  /*
    Updates related tag stats
  */
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

  /*
    1. Updated related tag articles
    2. Update tag stats
    3. Send notifications
  */
  return function publish(event) {
    return admin
      .database()
      .ref(`displayNames/byUid/${event.data.ref.parent.key}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      })
      .then(displayName => {
        return updateTag(event)
          .then(() => {
            return publishArticle(event, displayName);
          })
          .then(() => {
            if (!event.data.previous.val()) {
              return admin
                .database()
                .ref('subscriptions')
                .once('value')
                .then(snapshot => {
                  const subscriptions = snapshot.val();
                  const article = event.data.val();
                  const subscriptionTokens = Object.keys(subscriptions);

                  return admin
                    .messaging()
                    .sendToDevice(subscriptionTokens, {
                      notification: {
                        title: article.title,
                        body: `${displayName} | ${article.tag}`,
                        icon: '/logo_48x48.png',
                        click_action: `${process.env.NODE_ENV === 'production'
                          ? 'https://www.jsblog.io'
                          : 'http://localhost:3000'}/articles/${displayName}/${article.articleName}`,
                      },
                    })
                    .then(response => {
                      return Promise.all(
                        response.results.map((result, index) => {
                          if (result.error) {
                            return admin
                              .database()
                              .ref(`subscriptions/${subscriptionTokens[index]}`)
                              .set(null);
                          } else if (result.canonicalRegistrationToken) {
                            admin
                              .database()
                              .ref(`subscriptions/${subscriptionTokens[index]}`)
                              .set(null);

                            return admin
                              .database()
                              .ref(
                                `subscriptions/${result.canonicalRegistrationToken}`
                              )
                              .set(Date.now());
                          }
                        })
                      );
                    });
                });
            }
          });
      })
      .catch(error => {
        console.log('Publishing error', error);
      });
  };
}
