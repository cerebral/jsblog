'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _utils = require('../../utils');

var _CodeMirror = require('./CodeMirror');

var _CodeMirror2 = _interopRequireDefault(_CodeMirror);

var _drafts = require('../../services/drafts');

var _drafts2 = _interopRequireDefault(_drafts);

var _Publish = require('./Publish');

var _Publish2 = _interopRequireDefault(_Publish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx h */


var WriteArticle = function (_Component) {
  _inherits(WriteArticle, _Component);

  function WriteArticle(props) {
    _classCallCheck(this, WriteArticle);

    var _this = _possibleConstructorReturn(this, (WriteArticle.__proto__ || Object.getPrototypeOf(WriteArticle)).call(this, props));

    _this.state = {
      draft: null,
      compiledArticle: null,
      isSavingDraft: false,
      isPublishingDraft: false,
      isLoadingDraft: true
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.saveDraft = _this.saveDraft.bind(_this);
    _this.publishDraft = _this.publishDraft.bind(_this);
    return _this;
  }

  _createClass(WriteArticle, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var path = 'drafts/' + this.props.user.uid + '/' + this.props.params.draftKey;

      _drafts2.default.get(path).then(function (draft) {
        _this2.setState({
          draft: draft,
          compiledArticle: (0, _utils.compileArticle)(draft.content),
          isLoadingDraft: false
        });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      window.addEventListener('scroll', function () {
        var offset = _this3.previewContent.scrollHeight / _this3.codemirror.offsetHeight;

        _this3.previewContent.scrollTop = pageYOffset * offset;
      });
      this.saveInterval = null;
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      clearInterval(this.saveInterval);
      this.setState({
        draft: Object.assign(this.state.draft, { content: value }),
        compiledArticle: (0, _utils.compileArticle)(value)
      });
      this.saveInterval = setInterval(this.saveDraft, 10000);
    }
  }, {
    key: 'saveDraft',
    value: function saveDraft() {
      var _this4 = this;

      clearInterval(this.saveInterval);

      var title = _drafts2.default.getTitleFromToc(this.state.compiledArticle.toc);
      var articleName = _drafts2.default.createArticleName(title);
      var path = 'drafts/' + this.props.user.uid + '/' + this.props.params.draftKey;

      this.setState({
        isSavingDraft: true
      });

      return _drafts2.default.save(path, Object.assign({}, this.state.draft, {
        title: title,
        articleName: articleName,
        tag: 'react'
      })).then(function () {
        _this4.setState({
          isSavingDraft: false
        });
      });
    }
  }, {
    key: 'publishDraft',
    value: function publishDraft() {
      var _this5 = this;

      var title = _drafts2.default.getTitleFromToc(this.state.compiledArticle.toc);
      var articleName = _drafts2.default.createArticleName(title);
      var path = 'drafts/' + this.props.user.uid + '/' + this.props.params.draftKey;

      clearInterval(this.saveInterval);
      this.setState({
        isPublishingDraft: true
      });
      _drafts2.default.save(path, Object.assign({}, this.state.draft, {
        title: title,
        articleName: articleName,
        tag: 'react',
        isPublished: true
      })).then(function (draft) {
        var path = 'articles/' + _this5.props.user.uid + '/' + draft.articleName;
        return _drafts2.default.publish(path, Object.assign({}, draft, {
          key: _this5.props.params.draftKey
        }));
      }).then(function () {
        _this5.setState({
          isPublishingDraft: false
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      if (this.state.isLoadingDraft) {
        return (0, _preact.h)('div', { className: 'WriteArticle-wrapper', style: { opacity: 0 } });
      }

      return (0, _preact.h)(
        'div',
        { className: 'WriteArticle-wrapper', style: { opacity: 1 } },
        (0, _preact.h)(
          'div',
          { ref: function ref(node) {
              return _this6.codemirror = node;
            } },
          (0, _preact.h)(_CodeMirror2.default, {
            value: this.state.draft.content,
            onChange: this.onChange,
            key: 'codemirror'
          })
        ),
        (0, _preact.h)(
          'div',
          { className: 'WriteArticle-preview Article-content' },
          (0, _preact.h)(
            'div',
            {
              ref: function ref(node) {
                return _this6.previewContent = node;
              },
              className: 'WriteArticle-previewContent'
            },
            this.state.compiledArticle.tree
          )
        ),
        (0, _preact.h)(_Publish2.default, {
          onClick: this.publishDraft,
          isPublishingDraft: this.state.isPublishingDraft
        })
      );
    }
  }]);

  return WriteArticle;
}(_preact.Component);

exports.default = WriteArticle;