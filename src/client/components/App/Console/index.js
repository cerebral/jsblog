/** @jsx h */
import { h, Component } from 'preact';
import { compile, parseDisplayName } from '../../../../utils';
import cmd from '../../../services/cmd';

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
          : cmd.getTerminalOutput('jsblog help', this.props),
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
    cmd.run(value, this.props, newValue => {
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
