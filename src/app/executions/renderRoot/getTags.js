function getTags({ firebase }) {
  return firebase
    .value('tags', {
      orderByChild: 'lastDatetime',
      limitToFirst: 20,
    })
    .then(response => ({ tags: response.value }));
}

export default getTags;
