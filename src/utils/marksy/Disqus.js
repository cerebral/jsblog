/** @jsx h */
import { h, Component } from 'preact';

class Disqus extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    return prevProps.shortName !== this.props.shortName;
  }
  render() {
    if (this.props.context.isDraft) {
      return (
        <div className="Component-Disqus-placeholder">
          DISQUS PLACEHOLDER ({this.props.shortName})
        </div>
      );
    }

    return (
      <div>
        <div id="disqus_thread" data-name={this.props.shortName} />
      </div>
    );
  }
}

export default Disqus;
