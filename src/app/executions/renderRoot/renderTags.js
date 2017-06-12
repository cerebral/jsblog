/** @jsx h */
import { h } from 'preact';
import Tags from '../../../client/components/Tags';
import tagsStyles from '../../../client/components/Tags/styles.js';

function renderTags({ props, render }) {
  if (props.cache) {
    return { tagsContent: props.cache };
  }

  const tags = Object.keys(props.tags).reduce((allTags, tag) => {
    return allTags.concat({
      value: tag,
      count: props.tags[tag].readCount + props.tags[tag].recommendedCount,
    });
  }, []);

  return {
    tagsContent: {
      html: render.component(<Tags tags={tags} />),
      style: tagsStyles,
    },
  };
}

export default renderTags;
