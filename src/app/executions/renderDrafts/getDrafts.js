function getDrafts({ props, firebase }) {
  return firebase
    .value(`drafts/${props.user.uid}`)
    .then(response => ({ drafts: response.value }));
}

export default getDrafts;
