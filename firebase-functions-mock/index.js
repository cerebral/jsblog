const express = require('express');
const onWrite = require('./onWrite');

module.exports = {
  https: {
    onRequest(app) {
      app.use(express.static('public'));
      app.listen(3001, function() {
        console.log('Running server on port 3001');
      });
    },
  },
  database: {
    ref(path) {
      const admin = this.admin;

      return {
        onWrite(cb) {
          return onWrite(path, cb, admin);
        },
      };
    },
    admin: null,
  },
  IS_MOCK: true,
};
