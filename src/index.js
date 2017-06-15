const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const admin = firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
});
const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setGCMAPIKey(process.env.GCMAPIKey);

webpush.setVapidDetails(
  'mailto:christianalfoni@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

if (functions.IS_MOCK) {
  functions.database.admin = admin;
}

exports.app = functions.https.onRequest(
  require('./app').default(admin, webpush)
);
exports.publish = functions.database
  .ref('articles/{uid}/{articleName}')
  .onWrite(require('./publish').default(admin, webpush));
exports.readCount = functions.database
  .ref('reads/{displayName}/{articleName}')
  .onWrite(require('./readCount').default(admin));
