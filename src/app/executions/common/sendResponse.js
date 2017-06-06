function sendResponse({ props, res }) {
  props.res.status(200).send(props.response);
}

export default sendResponse;
