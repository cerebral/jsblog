import onInstall from './onInstall';
import onActivate from './onActivate';
import onMessage from './onMessage';
import onFetch from './onFetch';

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);
self.addEventListener('fetch', onFetch);
