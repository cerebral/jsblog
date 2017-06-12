function sendIndex({ props, res }) {
  props.res.status(200).send(props.index);
}

export default sendIndex;
