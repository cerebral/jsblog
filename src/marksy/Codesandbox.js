/** @jsx h */
import { h, Component } from 'preact';

class Codesandbox extends Component {
  shouldComponentUpdate(prevProps) {
    return prevProps.url !== this.props.url;
  }
  render() {
    const { url } = this.props;
    let id = url.split('/').pop();
    id = id.split('?')[0];

    return (
      <div className="Component-Codesandbox">
        <iframe
          src={`https://codesandbox.io/embed/${id}`}
          style="width:100%; height:500px; border:0; overflow:hidden;"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </div>
    );
  }
}

export default Codesandbox;
