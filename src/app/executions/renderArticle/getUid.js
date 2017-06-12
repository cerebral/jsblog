function getUid({ props, firebase }) {
  return firebase
    .value(`displayNames/byLogin/${props.req.params.displayName}`)
    .then(response => ({
      uid: response.value,
    }));
}

export default getUid;
