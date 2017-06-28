/** @jsx h */
import { h } from 'preact';
import Drafts from '../../../client/components/Drafts';
import draftsStyles from '../../../client/components/Drafts/styles.js';

function renderDrafts({ props, render }) {
  const drafts = Object.keys(props.drafts || [])
    .reduce((allDrafts, draftKey) => {
      return allDrafts.concat(
        Object.assign({ key: draftKey }, props.drafts[draftKey])
      );
    }, [])
    .sort((draftA, draftB) => {
      if (draftA.datetime > draftB.datetime) {
        return -1;
      } else if (draftA.datetime < draftB.datetime) {
        return 1;
      }

      return 0;
    });

  return {
    draftsContent: {
      html: render.component(<Drafts drafts={drafts} user={props.user} />),
      style: draftsStyles,
    },
  };
}

export default renderDrafts;
