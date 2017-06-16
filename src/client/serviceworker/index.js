import onInstall from './onInstall';
import onActivate from './onActivate';
import onMessage from './onMessage';
import onFetch from './onFetch';
import firebase from 'firebase';

firebase.initializeApp({
  messagingSenderId: JSON.parse(process.env.FIREBASE_CONFIG).messagingSenderId,
});

const messager = firebase.messaging();
messager.setBackgroundMessageHandler(payload => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo_48x48.png',
    click_action: payload.notification.href,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);
self.addEventListener('fetch', onFetch);
