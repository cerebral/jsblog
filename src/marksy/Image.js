/** @jsx h */
import { h } from 'preact';

const storageBucket = JSON.parse(process.env.FIREBASE_CONFIG).storageBucket;

function Image({ src, alt, width, height, align }) {
  const login = location.pathname.split('/')[2];
  let url = src;
  if (src.substr(0, 4) !== 'http') {
    url = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(
      `${login}/${src}`
    )}?alt=media`;
  }

  return (
    <div
      style={{
        textAlign: align || 'left',
      }}
    >
      <img
        src={url}
        alt={alt}
        style={{
          width: width || 'auto',
          height: height || 'auto',
        }}
      />
    </div>
  );
}

export default Image;
