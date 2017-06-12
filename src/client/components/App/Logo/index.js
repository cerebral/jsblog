/** @jsx h */
import { h } from 'preact';

function Logo(props) {
  return (
    <a href="/" className="Logo-wrapper">
      <div className="Logo-js">
        JS
      </div>
      <div className="Logo-blog">
        BLOG
      </div>
    </a>
  );
}

export default Logo;
