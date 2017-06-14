/** @jsx h */
import { h } from 'preact';
import Tags from '../../../client/components/Tags';
import tagsStyles from '../../../client/components/Tags/styles.js';

function renderTagsFactory(forceRender) {
  function renderTags({ props, render }) {
    if (props.cache && !forceRender) {
      return { tagsContent: props.cache };
    }

    return {
      tagsContent: {
        html: render.component(<Tags tags={props.tags} />),
        style: tagsStyles,
        content: props.tags,
      },
    };
  }

  return renderTags;
}

export default renderTagsFactory;
