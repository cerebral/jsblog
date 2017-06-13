import firebase from 'firebase';

export default {
  trackArticleRead(params) {
    const loadedTime = Date.now();
    const readTime = document.body.offsetHeight / 1000 * 30 * 1000;
    let hasRead = false;

    function checkRead() {
      if (
        !hasRead &&
        Date.now() >= loadedTime + readTime &&
        document.body.scrollTop + window.innerHeight >
          document.body.offsetHeight - 100
      ) {
        hasRead = true;
        firebase
          .database()
          .ref(`reads/${params.displayName}/${params.articleName}`)
          .transaction(maybeCount => {
            if (!maybeCount) {
              return 1;
            }

            return maybeCount + 1;
          });
      }
    }

    if (document.body.scrollHeight > document.body.offsetHeight) {
      document.addEventListener('scroll', checkRead);
    } else {
      setTimeout(checkRead, readTime);
    }
  },
};
