/** @jsx h */
import { h } from 'preact';

const storageBucket = JSON.parse(process.env.FIREBASE_CONFIG).storageBucket;

function Image({ src, alt, width, height, align, context, float }) {
  const login = context.login;
  let url = src;

  if (src.substr(0, 4) !== 'http') {
    url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(
      `${login}/${src}`
    )}?alt=media`;
  }

  return (
    <div
      className="Component-Image"
      style={{
        textAlign: align || 'left',
        padding: '10px',
        float: float || 'none',
        marginRight: float === 'left' ? '1em' : 0,
        marginLeft: float === 'right' ? '1em' : 0,
      }}
    >
      <img
        src={url}
        alt={alt}
        style={{
          width: width || '100%',
          height: height || 'auto',
        }}
      />
    </div>
  );
}

export default Image;
