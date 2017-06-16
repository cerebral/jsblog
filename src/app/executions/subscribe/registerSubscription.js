function registerSubscription({ props, firebase }) {
  return firebase.set(`subscriptions/${props.req.body.token}`, Date.now());
}

export default registerSubscription;
