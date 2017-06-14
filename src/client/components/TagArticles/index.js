/** @jsx h */
import { h, Component } from 'preact';

function TagArticles({ articles }) {
  return (
    <div className="TagArticles-wrapper">
      <table className="TagArticles-table">
        <tbody>
          {articles.map((article, index) =>
            <tr
              key={index}
              onClick={`location.href = ${JSON.stringify(article.href)}`}
            >
              <td>
                <a
                  className="TagArticles-title"
                  href={article.href}
                  onClick="event.stopPropagation()"
                >
                  {article.title}
                </a>
                <span className="TagArticles-datetime">
                  {new Date(article.datetime)
                    .toUTCString()
                    .split(' ')
                    .slice(0, 3)
                    .join(' ')}
                </span>
                {' | '}
                <span className="TagArticles-author">
                  {article.author}
                </span>
                {' | '}
                <span className="TagArticles-readCount">
                  {' '}read: {article.readCount}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TagArticles;
