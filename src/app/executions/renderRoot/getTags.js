function getTags({ firebase }) {
  return firebase.value('tags').then(response => ({ tags: response.value }));
}

export default getTags;
