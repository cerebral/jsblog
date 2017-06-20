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
  return self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
    click_action: payload.notification.click_action,
  });
});

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);
self.addEventListener('fetch', onFetch);
