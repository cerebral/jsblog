/** @jsx h */
import { h } from 'preact';
import Tags from '../../../client/components/Tags';
import tagsStyles from '../../../client/components/Tags/styles.js';

function renderTagsFactory(forceRender) {
  function renderTags({ props, render }) {
    if (props.cache && !forceRender) {
      return { tagsContent: props.cache };
    }

    const tags = Object.keys(props.tags || [])
      .sort((tagKeyA, tagKeyB) => {
        if (
          props.tags[tagKeyA].lastDatetime > props.tags[tagKeyB].lastDatetime
        ) {
          return -1;
        } else if (
          props.tags[tagKeyA].lastDatetime < props.tags[tagKeyB].lastDatetime
        ) {
          return 1;
        }

        return 0;
      })
      .reduce((allTags, tag, index, sortedTags) => {
        const lastTagKey = sortedTags[sortedTags.length - 1];
        const count = Math.round(
          (props.tags[tag].lastDatetime - props.tags[lastTagKey].lastDatetime) /
            86400000
        );

        return allTags.concat({
          value: tag,
          count: count + props.tags[tag].readCount,
        });
      }, []);

    return {
      tagsContent: {
        html: render.component(<Tags tags={tags} />),
        style: tagsStyles,
      },
    };
  }

  return renderTags;
}

export default renderTagsFactory;
