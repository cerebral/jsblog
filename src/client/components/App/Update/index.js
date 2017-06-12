/** @jsx h */
import { h, Component } from 'preact';

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = { isHidden: false };
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  onKeyDown(event) {
    if (event.keyCode === 32) {
      location.reload();
      window.removeEventListener('keydown', this.onKeyDown);
    } else if (event.keyCode === 27) {
      this.setState({
        isHidden: true,
      });
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }
  render() {
    if (this.state.isHidden) {
      return null;
    }

    return (
      <div className="App-update">
        Updated, hit <strong>SPACE</strong> or <strong>ESC</strong> to abort
      </div>
    );
  }
}

export default Update;
