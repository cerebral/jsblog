/** @jsx h */
import { h } from 'preact';

function Youtube({ url, align, float, width, height }) {
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

export default Youtube;
