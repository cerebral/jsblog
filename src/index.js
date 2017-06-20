/*
  This is the main functions file that runs the express app function and additional
  functions for handling changes in the database. It is not using es2015 due to supprting
  firebase-functions entry
*/
const firebase = require('firebase-admin');
const admin = firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
});
let functions = require('firebase-functions');

/*
  When developing we are using the mock project to get the
  same behaviour as when deployed
*/
if (DEBUG) {
  functions = require('firebase-functions-mock')(admin);
}

/*
  To make sure our functions are using the same instance of firebase-admin
  we pass it into each function
*/
exports.app = functions.https.onRequest(require('./app').default(admin));
exports.publish = functions.database
  .ref('articles/{uid}/{articleName}')
  .onWrite(require('./publish').default(admin));
exports.readCount = functions.database
  .ref('reads/{displayName}/{articleName}')
  .onWrite(require('./readCount').default(admin));
