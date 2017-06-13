'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _utils = require('../../utils');

var _CodeMirror = require('./CodeMirror');

var _CodeMirror2 = _interopRequireDefault(_CodeMirror);

var _draft = require('../../services/draft');

var _draft2 = _interopRequireDefault(_draft);

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
      compiledArticle: null,
      isLoadingDraft: true
    };
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(WriteArticle, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _draft2.default.load(this.props.user.uid, this.props.params.draftKey).then(function (draft) {
        _this2.setState({
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
      var compiledArticle = (0, _utils.compileArticle)(value);

      _draft2.default.update({
        content: value,
        title: _draft2.default.getTitleFromToc(compiledArticle.toc)
      });

      this.setState({
        compiledArticle: compiledArticle
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (this.state.isLoadingDraft) {
        return (0, _preact.h)('div', { className: 'WriteArticle-wrapper', style: { opacity: 0 } });
      }

      return (0, _preact.h)(
        'div',
        { className: 'WriteArticle-wrapper', style: { opacity: 1 } },
        (0, _preact.h)(
          'div',
          { ref: function ref(node) {
              return _this4.codemirror = node;
            } },
          (0, _preact.h)(_CodeMirror2.default, {
            value: _draft2.default.current.content,
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
                return _this4.previewContent = node;
              },
              className: 'WriteArticle-previewContent'
            },
            this.state.compiledArticle.tree
          )
        )
      );
    }
  }]);

  return WriteArticle;
}(_preact.Component);

exports.default = WriteArticle;