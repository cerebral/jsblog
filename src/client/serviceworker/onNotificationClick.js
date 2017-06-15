export default function onNotificationClick(event) {
  const data = event.notification.data;
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function(windowClients) {
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          return client.focus().then(() => client.navigate(data.href));
        }
      })
  );
}
