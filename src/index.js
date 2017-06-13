const functions = require('firebase-functions');

exports.app = functions.https.onRequest(require('./app').default);
exports.publish = functions.database
  .ref('articles/{uid}/{articleName}')
  .onWrite(require('./publish').default);
exports.readCount = functions.database
  .ref('reads/{displayName}/{articleName}')
  .onWrite(require('./readCount').default);
