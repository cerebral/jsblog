import firebase from 'firebase';

let interval = null;

export default {
  current: null,
  uid: null,
  key: null,
  load(uid, key) {
    this.uid = uid;
    this.key = key;

    return firebase
      .database()
      .ref(`drafts/${uid}/${key}`)
      .once('value')
      .then(snapshot => {
        return (this.current = snapshot.val());
      });
  },
  create(uid) {
    const newDraftKey = firebase.database().ref().child(`drafts/${uid}`).push()
      .key;

    this.uid = uid;
    this.key = newDraftKey;

    this.current = {
      title: 'No Title',
      datetime: Date.now(),
      content: '# No Title',
      articleName: 'no_title',
      isPublished: false,
    };

    return firebase
      .database()
      .ref(`drafts/${uid}/${newDraftKey}`)
      .set(this.current)
      .then(() => newDraftKey);
  },
  update(update) {
    clearInterval(interval);
    Object.assign(this.current, update);
    Object.assign(this.current, {
      articleName: this.current.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/g, '_'),
    });
    interval = setInterval(this.save.bind(this), 10000);
  },
  save() {
    clearInterval(interval);
    this.update({
      datetime: Date.now(),
    });

    return firebase
      .database()
      .ref(`drafts/${this.uid}/${this.key}`)
      .update(this.current)
      .then(() => this.current);
  },
  getTitleFromToc(toc) {
    for (let node in toc) {
      if (toc[node].level === 1) {
        return toc[node].title;
      }
    }

    return 'No Title';
  },
  setTag(tag) {
    if (!tag) {
      throw new Error();
    }
    this.current.tag = tag;
    return firebase
      .database()
      .ref(`tags/${tag}`)
      .once('value')
      .then(snapshot => snapshot.val());
  },
  publish() {
    return firebase
      .database()
      .ref(`articles/${this.uid}/${this.current.articleName}`)
      .set(
        Object.assign({}, this.current, {
          key: this.key,
          isPublished: true,
        })
      );
  },
};
