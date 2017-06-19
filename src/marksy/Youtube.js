/** @jsx h */
import { h, Component } from 'preact';

class Youtube extends Component {
  shouldComponentUpdate(prevProps) {
    return (
      prevProps.url !== this.props.url ||
      prevProps.align !== this.props.align ||
      prevProps.float !== this.props.float ||
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    );
  }
  render() {
    const { url, align, float, width, height } = this.props;
    const id =
      url &&
      url.split('?')[1] &&
      url.split('?')[1].split('&')[0] &&
      url.split('?')[1].split('&')[0].split('=')[1];

    return (
      <div
        className="Component-Youtube"
        style={{
          textAlign: align || 'left',
          padding: '10px',
          float: float || 'none',
          marginRight: float === 'left' ? '1em' : 0,
          marginLeft: float === 'right' ? '1em' : 0,
        }}
      >
        <iframe
          width="560"
          height="315"
          style={{ width: width || '100%', height: height || '315px' }}
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }
}

export default Youtube;
