/** @jsx h */
import { h, Component } from 'preact';

class CodeMirror extends Component {
  componentDidMount() {
    const CodeMirror = require('codemirror');
    require('codemirror/mode/markdown/markdown');
    const cm = CodeMirror(document.querySelector('#codemirror'), {
      autofocus: true,
      tabSize: 2,
      mode: 'markdown',
      viewportMargin: 20,
      minHeight: '200px',
      lineWrapping: true,
    });
    cm.on('change', () => {
      this.props.onChange(cm.getDoc().getValue());
    });
    setTimeout(() => {
      cm.setValue(this.props.value);
    });
  }
  render() {
    return (
      <div className="WriteArticle-codemirror">
        <div id="codemirror" />
      </div>
    );
  }
}

export default CodeMirror;
