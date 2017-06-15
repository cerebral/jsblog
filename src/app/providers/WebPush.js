function WebPushFactory(webpush) {
  function WebPush(context) {
    context.webpush = {
      sendNotification(subscription, data) {
        return webpush.sendNotification(subscription, JSON.stringify(data));
      },
    };

    return context;
  }

  return WebPush;
}

export default WebPushFactory;
