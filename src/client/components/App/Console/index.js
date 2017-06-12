/** @jsx h */
import { h, Component } from 'preact';
import { compile } from '../../../utils';
import draft from '../../../services/draft';
import cache from '../../../services/cache';

function renderWelcome() {
  return [
    '### Welcome to JSBlog',
    '- jsblog new  - *write new article*',
    '- jsblog tag  - *tag article*',
    '- jsblog publish  - *publish article*',
    '- jsblog theme - *list possible themes*',
    '- jsblog theme *sometheme* - *activate a new theme*',
    '- jsblog help - *this welcome*',
  ];
}

function evaluateCommand(text, props, updateTerminal) {
  if (text === 'jsblog new') {
    updateTerminal(['Creating draft...']);
    return draft.create(props.user.uid).then(draftKey => {
      updateTerminal(['Draft created, redirecting...']);
      location.href = `/drafts/${props.user.displayName}/${draftKey}`;
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

  if (text === 'jsblog publish') {
    updateTerminal(['Saving draft...']);
    return draft
      .save()
      .then(() => {
        updateTerminal(['Saved. Publishing...']);
        return draft.publish();
      })
      .then(path => {
        updateTerminal(['Published!']);
        cache.clearUrl(
          `/articles/${props.user.displayName}/${draft.current.articleName}`
        );
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
    console.log(text);
    return draft
      .setTag(text.split(' ')[2])
      .then(tagInfo => {
        if (tagInfo) {
          updateTerminal([
            'Tag is set. Current stats:',
            `- Articles: **${tagInfo.articleCount}**`,
            `- Read: **${tagInfo.readCount}**`,
            `- Recommended: **${tagInfo.recommendedCount}**`,
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
    return updateTermianal(['### Available themes', '- hund']);
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
          : <div className="App-console-wrapper">
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
                <form onSubmit={this.submit}>
                  <input
                    ref={node => (this.input = node)}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="App-console-cmd"
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
