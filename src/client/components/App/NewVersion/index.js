/** @jsx h */
import { h, Component } from 'preact';

class NewVersion extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    window.addEventListener('click', this.onClick);
  }
  onClick(event) {
    location.reload();
  }
  render() {
    return (
      <div className="App-update">
        New app version, <strong>click</strong> anywhere
      </div>
    );
  }
}

export default NewVersion;
