export default [
  function registerSubscription({ props, firebase }) {
    const subscription = props.req.body;
    const clientId = subscription.endpoint.split('/send')[1];

    return firebase.set(`subscriptions/${clientId}`, subscription);
  },
  function sendResponse({ props }) {
    props.res.sendStatus(200);
  },
];
