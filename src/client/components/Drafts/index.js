/** @jsx h */
import { h, Component } from 'preact';
import { parseDisplayName } from '../../../utils';

function Drafts({ drafts, user }) {
  return (
    <div className="Drafts-wrapper">
      <table className="Drafts-table">
        <tbody>
          {drafts.map((draft, index) =>
            <tr
              key={index}
              onClick={`location.href = ${JSON.stringify(
                `/drafts/${parseDisplayName(user).login}/${draft.key}`
              )}`}
            >
              <td>
                <a
                  className="Drafts-title"
                  href={`/drafts/${parseDisplayName(user).login}/${draft.key}`}
                  onClick="event.stopPropagation()"
                >
                  {draft.title}
                </a>
                <span className="Drafts-datetime">
                  {new Date(draft.datetime)
                    .toUTCString()
                    .split(' ')
                    .slice(0, 3)
                    .join(' ')}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Drafts;
