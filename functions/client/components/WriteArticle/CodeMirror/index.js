'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx h */


var CodeMirror = function (_Component) {
  _inherits(CodeMirror, _Component);

  function CodeMirror() {
    _classCallCheck(this, CodeMirror);

    return _possibleConstructorReturn(this, (CodeMirror.__proto__ || Object.getPrototypeOf(CodeMirror)).apply(this, arguments));
  }

  _createClass(CodeMirror, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var CodeMirror = require('codemirror');
      require('codemirror/mode/markdown/markdown');
      var cm = CodeMirror(document.querySelector('#codemirror'), {
        autofocus: true,
        tabSize: 2,
        mode: 'markdown',
        viewportMargin: 20,
        minHeight: '200px',
        lineWrapping: true
      });
      cm.on('change', function () {
        _this2.props.onChange(cm.getDoc().getValue());
      });
      setTimeout(function () {
        cm.setValue(_this2.props.value);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'div',
        { className: 'WriteArticle-codemirror' },
        (0, _preact.h)('div', { id: 'codemirror' })
      );
    }
  }]);

  return CodeMirror;
}(_preact.Component);

exports.default = CodeMirror;