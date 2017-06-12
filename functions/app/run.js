'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _functionTree = require('function-tree');

var _firebaseAdmin = require('@cerebral/firebase-admin');

var _Render = require('./providers/Render');

var _Render2 = _interopRequireDefault(_Render);

var _Cache = require('./providers/Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _serviceAccount = require('../serviceAccount.json');

var _serviceAccount2 = _interopRequireDefault(_serviceAccount);

var _devtools = require('function-tree/devtools');

var _devtools2 = _interopRequireDefault(_devtools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ft = new _functionTree.FunctionTree([_Render2.default, (0, _firebaseAdmin.Provider)({
  serviceAccount: _serviceAccount2.default,
  databaseURL: 'https://gblog-f47ee.firebaseio.com'
}), _Cache2.default]);

if (process.env.NODE_ENV !== 'production') {
  var devtools = new _devtools2.default({
    host: 'localhost:8989'
  });

  devtools.add(ft);
}

function run(tree) {
  return function handleRequest(req, res) {
    ft.run(req.path, tree, {
      req: req,
      res: res
    }).catch(function (error) {
      console.error(error.message);
      console.error(error.stack);
      res.status(500).send(error.message);
    });
  };
}

exports.default = run;