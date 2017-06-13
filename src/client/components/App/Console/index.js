/** @jsx h */
import { h, Component } from 'preact';
import { compile, parseDisplayName } from '../../../../utils';
import draft from '../../../services/draft';
import cache from '../../../services/cache';
import authentication from '../../../services/authentication';

function renderWelcome() {
  return [
    '### Welcome to JSBlog',
    '- jsblog new  - *write new article*',
    '- jsblog tag  - *tag article*',
    '- jsblog publish  - *publish article*',
    '- jsblog edit  - *edit article*',
    '- jsblog theme - *list possible themes*',
    '- jsblog theme *sometheme* - *activate a new theme*',
    '- jsblog help - *this welcome*',
  ];
}

function evaluateCommand(text, props, updateTerminal) {
  const login = parseDisplayName(props.user).login;

  if (text === 'jsblog new') {
    updateTerminal(['Creating draft...']);
    return draft.create(props.user.uid).then(draftKey => {
      updateTerminal(['Draft created, redirecting...']);
      location.href = `/drafts/${login}/${draftKey}`;
    });
  }

  if (
    (text === 'jsblog publish' || text.indexOf('jsblog tag') === 0) &&
    !draft.current
  ) {
    return updateTerminal(['You have to create a new article first']);
  }

  if (text === 'jsblog publish' && !draft.current.tag) {
    return updateTerminal([
      `You have to set a tag before you can publish the article.`,
    ]);
  }

  if (text === 'jsblog edit') {
    const ownerLogin = location.pathname.split('/')[2];
    if (ownerLogin !== login) {
      updateTerminal([`This is not your article!`]);
    } else {
      updateTerminal([`Redirecting you to the draft...`]);
      location.href = `/drafts/${ownerLogin}/${document.querySelector('article')
        .id}`;
    }

    return;
  }

  if (text === 'jsblog publish') {
    updateTerminal(['Saving draft...']);
    return draft
      .save()
      .then(() => {
        updateTerminal(['Saved. Publishing...']);
        return draft.publish();
      })
      .then(path => {
        updateTerminal([
          `Published at [/articles/${login}/${draft.current
            .articleName}](/articles/${login}/${draft.current.articleName})`,
        ]);
        cache.clearUrl([
          `/`,
          `/articles/${login}/${draft.current.articleName}`,
          `/tags/${draft.current.tag}`,
        ]);
      });
  }

  if (text.indexOf('jsblog tag') === 0 && draft.current.isPublished) {
    return updateTerminal([
      `You have already published this article with tag **${draft.current
        .tag}**`,
    ]);
  }

  if (text.indexOf('jsblog tag') === 0) {
    updateTerminal(['Setting tag...']);
    return draft
      .setTag(text.split(' ')[2])
      .then(tagInfo => {
        if (tagInfo) {
          updateTerminal([
            'Tag is set. Current stats:',
            `- Articles count: **${tagInfo.articleCount}**`,
            `- Read count: **${tagInfo.readCount}**`,
          ]);
        } else {
          updateTerminal(['Tag is set. You are the first to use this tag.']);
        }
      })
      .catch(() => {
        updateTerminal(['Unable to set this tag, sorry']);
      });
  }

  if (text === 'jsblog theme') {
    return updateTerminal([
      '### Available themes',
      '- hund',
      '- mostly-bright',
    ]);
  }

  if (text.indexOf('jsblog theme') === 0) {
    const themes = ['hund', 'mostly-bright'];
    const theme = text.split(' ')[2];
    if (themes.indexOf(theme) === -1) {
      return updateTerminal(['You have not given a valid theme']);
    }

    updateTerminal(['Updating theme...']);
    return authentication
      .updateTheme(theme)
      .then(() => {
        return authentication.getToken(true);
      })
      .then(token => {
        authentication.writeCookie(token);
        cache.clearAll();
        updateTerminal(['Theme updated, reloading app']);
        location.reload();
      });
  }

  if (text === 'jsblog help') {
    return updateTerminal(renderWelcome());
  }
}

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClosed: props.forceOpen ? false : true,
      inputValue: '',
      textareaValue: typeof window === 'undefined'
        ? []
        : localStorage.getItem('console')
          ? JSON.parse(localStorage.getItem('console'))
          : renderWelcome(),
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.toggleExpandByShortcut = this.toggleExpandByShortcut.bind(this);
    this.identifyMetaKey = this.identifyMetaKey.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.identifyMetaKey);
    window.addEventListener('keyup', this.toggleExpandByShortcut);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.identifyMetaKey);
    window.removeEventListener('keyup', this.toggleExpandByShortcut);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isClosed && !this.state.isClosed) {
      this.textarea.scrollTop = '9999999999';
      this.input.focus();
    }
  }
  onInputChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }
  submit(event) {
    event.preventDefault();
    const value = this.state.inputValue;
    this.setState({
      inputValue: '',
    });
    evaluateCommand(value, this.props, newValue => {
      this.setState(
        {
          textareaValue: this.state.textareaValue.concat(newValue),
        },
        () => {
          this.textarea.scrollTop = '9999999999';
        }
      );
    });
  }
  identifyMetaKey(event) {
    this.triggerMetaKey =
      event.metaKey && (event.keyCode === 91 || event.keyCode === 17);
  }
  toggleExpandByShortcut() {
    if (this.triggerMetaKey) {
      this.toggleExpand();
    }
  }
  toggleExpand() {
    const isClosed = this.state.isClosed;
    this.setState({
      isClosed: !isClosed,
    });
  }
  render() {
    return (
      <div className={`App-console${this.state.isClosed ? '' : ' open'}`}>
        <div className="App-console-bar" onClick={this.toggleExpand}>
          <div className="App-console-title">JSBlog terminal</div>
          <div className="App-console-expand">
            {this.state.isClosed ? '▲' : '▼'}
          </div>
        </div>
        {this.state.isClosed
          ? null
          : <div
              className="App-console-wrapper"
              onClick={() => this.input.focus()}
            >
              <div
                ref={node => (this.textarea = node)}
                className="App-console-textarea"
              >
                {this.state.textareaValue.map((value, index) =>
                  <div key={index}>{compile(value).tree}</div>
                )}
              </div>
              <div className="App-console-cmd-wrapper">
                <input className="App-console-cmd-sudo" value="$" readOnly />
                <form className="App-console-cmd" onSubmit={this.submit}>
                  <input
                    ref={node => (this.input = node)}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    onChange={this.onInputChange}
                    value={this.state.inputValue}
                    autoComplete="off"
                  />
                </form>
              </div>
            </div>}
      </div>
    );
  }
}

export default Console;
