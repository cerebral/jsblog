'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interval = null;

exports.default = {
  current: null,
  uid: null,
  key: null,
  load: function load(uid, key) {
    var _this = this;

    this.uid = uid;
    this.key = key;

    return _firebase2.default.database().ref('drafts/' + uid + '/' + key).once('value').then(function (snapshot) {
      return _this.current = snapshot.val();
    });
  },
  create: function create(uid) {
    var newDraftKey = _firebase2.default.database().ref().child('drafts/' + uid).push().key;

    this.uid = uid;
    this.key = newDraftKey;

    this.current = {
      title: 'No Title',
      datetime: Date.now(),
      content: '# No Title',
      articleName: 'no_title',
      isPublished: false
    };

    return _firebase2.default.database().ref('drafts/' + uid + '/' + newDraftKey).set(this.current).then(function () {
      return newDraftKey;
    });
  },
  update: function update(_update) {
    clearInterval(interval);
    Object.assign(this.current, _update);
    Object.assign(this.current, {
      articleName: this.current.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '_')
    });
    interval = setInterval(this.save.bind(this), 10000);
  },
  save: function save() {
    var _this2 = this;

    this.update({
      datetime: Date.now()
    });

    clearInterval(interval);

    return _firebase2.default.database().ref('drafts/' + this.uid + '/' + this.key).update(this.current).then(function () {
      return _this2.current;
    });
  },
  getTitleFromToc: function getTitleFromToc(toc) {
    for (var node in toc) {
      if (toc[node].level === 1) {
        return toc[node].title;
      }
    }

    return 'No Title';
  },
  setTag: function setTag(tag) {
    if (!tag) {
      throw new Error();
    }
    this.current.tag = tag;
    return _firebase2.default.database().ref('tags/' + tag).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  },
  publish: function publish() {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      var valueUpdateCount = 0;

      var ref = _firebase2.default.database().ref('tagArticles/' + _this3.current.tag + '/' + _this3.key);

      var callback = ref.on('value', function (snapshot) {
        if (snapshot.val() && snapshot.val().datetime === _this3.current.datetime) {
          ref.off('value', callback);
          resolve();
        }
      });

      _firebase2.default.database().ref('articles/' + _this3.uid + '/' + _this3.current.articleName).set(Object.assign({}, _this3.current, {
        key: _this3.key,
        isPublished: true
      }));
    }).catch(function (error) {
      console.log('Error publishing', error);
    });
  }
};