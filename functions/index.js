const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest(require('./app').default);
