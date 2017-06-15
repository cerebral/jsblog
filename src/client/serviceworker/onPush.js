export default function onPush(event) {
  const data = JSON.parse(event.data.text());
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/logo_48x48.png',
      data: {
        href: data.href,
      },
    })
  );
}
