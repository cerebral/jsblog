import onInstall from './onInstall';
import onActivate from './onActivate';
import onMessage from './onMessage';
import onFetch from './onFetch';
import onPush from './onPush';
import onNotificationClick from './onNotificationClick';

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);
self.addEventListener('fetch', onFetch);
self.addEventListener('push', onPush);
self.addEventListener('notificationclick', onNotificationClick);
