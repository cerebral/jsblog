'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx h */


var Update = function (_Component) {
  _inherits(Update, _Component);

  function Update(props) {
    _classCallCheck(this, Update);

    var _this = _possibleConstructorReturn(this, (Update.__proto__ || Object.getPrototypeOf(Update)).call(this, props));

    _this.state = { isHidden: false };
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  _createClass(Update, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.keyCode === 32) {
        location.reload();
        window.removeEventListener('keydown', this.onKeyDown);
      } else if (event.keyCode === 27) {
        this.setState({
          isHidden: true
        });
        window.removeEventListener('keydown', this.onKeyDown);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.isHidden) {
        return null;
      }

      return (0, _preact.h)(
        'div',
        { className: 'App-update' },
        'Updated, hit ',
        (0, _preact.h)(
          'strong',
          null,
          'SPACE'
        ),
        ' or ',
        (0, _preact.h)(
          'strong',
          null,
          'ESC'
        ),
        ' to abort'
      );
    }
  }]);

  return Update;
}(_preact.Component);

exports.default = Update;