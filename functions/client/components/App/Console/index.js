'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _utils = require('../../../utils');

var _draft = require('../../../services/draft');

var _draft2 = _interopRequireDefault(_draft);

var _cache = require('../../../services/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx h */


function renderWelcome() {
  return ['### Welcome to JSBlog', '- jsblog new  - *write new article*', '- jsblog tag  - *tag article*', '- jsblog publish  - *publish article*', '- jsblog theme - *list possible themes*', '- jsblog theme *sometheme* - *activate a new theme*', '- jsblog help - *this welcome*'];
}

function evaluateCommand(text, props, updateTerminal) {
  if (text === 'jsblog new') {
    updateTerminal(['Creating draft...']);
    return _draft2.default.create(props.user.uid).then(function (draftKey) {
      updateTerminal(['Draft created, redirecting...']);
      location.href = '/drafts/' + props.user.displayName + '/' + draftKey;
    });
  }

  if ((text === 'jsblog publish' || text.indexOf('jsblog tag') === 0) && !_draft2.default.current) {
    return updateTerminal(['You have to create a new article first']);
  }

  if (text === 'jsblog publish' && !_draft2.default.current.tag) {
    return updateTerminal(['You have to set a tag before you can publish the article.']);
  }

  if (text === 'jsblog publish') {
    updateTerminal(['Saving draft...']);
    return _draft2.default.save().then(function () {
      updateTerminal(['Saved. Publishing...']);
      return _draft2.default.publish();
    }).then(function (path) {
      updateTerminal(['Published at [/articles/' + props.user.displayName + '/' + _draft2.default.current.articleName + '](/articles/' + props.user.displayName + '/' + _draft2.default.current.articleName + ')']);
      _cache2.default.clearUrl(['/', '/articles/' + props.user.displayName + '/' + _draft2.default.current.articleName, '/tags/' + _draft2.default.current.tag]);
    });
  }

  if (text.indexOf('jsblog tag') === 0 && _draft2.default.current.isPublished) {
    return updateTerminal(['You have already published this article with tag **' + _draft2.default.current.tag + '**']);
  }

  if (text.indexOf('jsblog tag') === 0) {
    updateTerminal(['Setting tag...']);
    return _draft2.default.setTag(text.split(' ')[2]).then(function (tagInfo) {
      if (tagInfo) {
        updateTerminal(['Tag is set. Current stats:', '- Articles: **' + tagInfo.articleCount + '**', '- Read: **' + tagInfo.readCount + '**', '- Recommended: **' + tagInfo.recommendedCount + '**']);
      } else {
        updateTerminal(['Tag is set. You are the first to use this tag.']);
      }
    }).catch(function () {
      updateTerminal(['Unable to set this tag, sorry']);
    });
  }

  if (text === 'jsblog theme') {
    return updateTermianal(['### Available themes', '- hund']);
  }

  if (text === 'jsblog help') {
    return updateTerminal(renderWelcome());
  }
}

var Console = function (_Component) {
  _inherits(Console, _Component);

  function Console(props) {
    _classCallCheck(this, Console);

    var _this = _possibleConstructorReturn(this, (Console.__proto__ || Object.getPrototypeOf(Console)).call(this, props));

    _this.state = {
      isClosed: props.forceOpen ? false : true,
      inputValue: '',
      textareaValue: typeof window === 'undefined' ? [] : localStorage.getItem('console') ? JSON.parse(localStorage.getItem('console')) : renderWelcome()
    };
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.submit = _this.submit.bind(_this);
    _this.toggleExpand = _this.toggleExpand.bind(_this);
    _this.toggleExpandByShortcut = _this.toggleExpandByShortcut.bind(_this);
    _this.identifyMetaKey = _this.identifyMetaKey.bind(_this);
    return _this;
  }

  _createClass(Console, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.identifyMetaKey);
      window.addEventListener('keyup', this.toggleExpandByShortcut);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.identifyMetaKey);
      window.removeEventListener('keyup', this.toggleExpandByShortcut);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.isClosed && !this.state.isClosed) {
        this.textarea.scrollTop = '9999999999';
        this.input.focus();
      }
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(event) {
      this.setState({
        inputValue: event.target.value
      });
    }
  }, {
    key: 'submit',
    value: function submit(event) {
      var _this2 = this;

      event.preventDefault();
      var value = this.state.inputValue;
      this.setState({
        inputValue: ''
      });
      evaluateCommand(value, this.props, function (newValue) {
        _this2.setState({
          textareaValue: _this2.state.textareaValue.concat(newValue)
        }, function () {
          _this2.textarea.scrollTop = '9999999999';
        });
      });
    }
  }, {
    key: 'identifyMetaKey',
    value: function identifyMetaKey(event) {
      this.triggerMetaKey = event.metaKey && (event.keyCode === 91 || event.keyCode === 17);
    }
  }, {
    key: 'toggleExpandByShortcut',
    value: function toggleExpandByShortcut() {
      if (this.triggerMetaKey) {
        this.toggleExpand();
      }
    }
  }, {
    key: 'toggleExpand',
    value: function toggleExpand() {
      var isClosed = this.state.isClosed;
      this.setState({
        isClosed: !isClosed
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return (0, _preact.h)(
        'div',
        { className: 'App-console' + (this.state.isClosed ? '' : ' open') },
        (0, _preact.h)(
          'div',
          { className: 'App-console-bar', onClick: this.toggleExpand },
          (0, _preact.h)(
            'div',
            { className: 'App-console-title' },
            'JSBlog terminal'
          ),
          (0, _preact.h)(
            'div',
            { className: 'App-console-expand' },
            this.state.isClosed ? '▲' : '▼'
          )
        ),
        this.state.isClosed ? null : (0, _preact.h)(
          'div',
          { className: 'App-console-wrapper' },
          (0, _preact.h)(
            'div',
            {
              ref: function ref(node) {
                return _this3.textarea = node;
              },
              className: 'App-console-textarea'
            },
            this.state.textareaValue.map(function (value, index) {
              return (0, _preact.h)(
                'div',
                { key: index },
                (0, _utils.compile)(value).tree
              );
            })
          ),
          (0, _preact.h)(
            'div',
            { className: 'App-console-cmd-wrapper' },
            (0, _preact.h)('input', { className: 'App-console-cmd-sudo', value: '$', readOnly: true }),
            (0, _preact.h)(
              'form',
              { onSubmit: this.submit },
              (0, _preact.h)('input', {
                ref: function ref(node) {
                  return _this3.input = node;
                },
                autoCorrect: 'off',
                autoCapitalize: 'off',
                spellCheck: 'false',
                className: 'App-console-cmd',
                onChange: this.onInputChange,
                value: this.state.inputValue,
                autoComplete: 'off'
              })
            )
          )
        )
      );
    }
  }]);

  return Console;
}(_preact.Component);

exports.default = Console;