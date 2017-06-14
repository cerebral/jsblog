import draft from '../draft';
import { parseDisplayName } from '../../../utils';

function tag(updateTerminal, props, name) {
  if (!draft.current) {
    return updateTerminal(['You have to create a new article first']);
  }

  if (draft.current.isPublished) {
    return updateTerminal([
      `You have already published this article with tag: **${draft.current
        .tag}**.`,
    ]);
  }

  if (!name) {
    return updateTerminal([
      draft.current.tag
        ? `Current tag is: **${draft.current.tag}**.`
        : 'There is not tag set yet',
    ]);
  }

  updateTerminal(['Setting tag...']);
  draft
    .setTag(name)
    .then(tagInfo => {
      if (tagInfo) {
        updateTerminal([
          'Tag is set. Current stats:',
          `- Articles count: **${tagInfo.articleCount + 1}**`,
          `- Read count: **${tagInfo.readCount}**`,
        ]);
      } else {
        updateTerminal(['Tag is set. You are the first to use this tag.']);
      }
    })
    .catch(() => {
      updateTerminal(['Unable to set this tag, sorry']);
    });
}

export default tag;
