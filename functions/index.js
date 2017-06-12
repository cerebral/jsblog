'use strict';

var functions = require('firebase-functions');

exports.app = functions.https.onRequest(require('./app').default);
exports.publish = functions.database.ref('articles/{uid}/{articleName}').onWrite(require('./publish').default);