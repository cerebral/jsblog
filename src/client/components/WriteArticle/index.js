/** @jsx h */
import { h, Component } from 'preact';
import { compileArticle } from '../../../utils';
import CodeMirror from './CodeMirror';
import draft from '../../services/draft';
import { parseDisplayName } from '../../../utils';

class WriteArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compiledArticle: null,
      isLoadingDraft: true,
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    draft.load(this.props.user.uid, this.props.params.draftKey).then(draft => {
      this.setState({
        compiledArticle: compileArticle(draft.content, {
          login: parseDisplayName(this.props.user).login,
          article: draft,
          isDraft: true,
        }),
        isLoadingDraft: false,
      });
    });
  }
  componentDidMount() {
    window.addEventListener('scroll', () => {
      const offset =
        this.previewContent.scrollHeight / this.codemirror.offsetHeight;

      this.previewContent.scrollTop = pageYOffset * offset - 40;
    });
    this.saveInterval = null;
  }
  onChange(value) {
    const compiledArticle = compileArticle(value, {
      login: parseDisplayName(this.props.user).login,
      article: draft.current,
      isDraft: true,
    });

    draft.update({
      content: value,
      title: draft.getTitleFromToc(compiledArticle.toc),
    });

    this.setState({
      compiledArticle,
    });
  }
  render() {
    if (this.state.isLoadingDraft) {
      return <div className="WriteArticle-wrapper" style={{ opacity: 0 }} />;
    }

    return (
      <div className="WriteArticle-wrapper" style={{ opacity: 1 }}>
        <div ref={node => (this.codemirror = node)}>
          <CodeMirror
            value={draft.current.content}
            onChange={this.onChange}
            key="codemirror"
          />
        </div>
        <div className="WriteArticle-preview Article-content">
          <div
            ref={node => (this.previewContent = node)}
            className="WriteArticle-previewContent"
          >
            {this.state.compiledArticle.tree}
          </div>
        </div>
      </div>
    );
  }
}

export default WriteArticle;
