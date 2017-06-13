/** @jsx h */
import { h, Component } from 'preact';

function TagArticles({ articles }) {
  return (
    <div className="TagArticles-wrapper">
      <table className="TagArticles-table">
        <thead>
          <tr>
            <th>published</th>
            <th>title</th>
            <th>author</th>
            <th>reads</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) =>
            <tr
              key={index}
              onClick={`location.href = ${JSON.stringify(article.href)}`}
            >
              <td className="TagArticles-datetime">
                {new Date(article.datetime)
                  .toUTCString()
                  .split(' ')
                  .slice(0, 3)
                  .join(' ')}
              </td>
              <td className="TagArticles-title">
                <a href={article.href} onClick="event.stopPropagation()">
                  {article.title}
                </a>
              </td>
              <td className="TagArticles-author">
                {article.author}
              </td>
              <td className="TagArticles-readCount">
                {article.readCount}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TagArticles;
