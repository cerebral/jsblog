import draft from '../draft';
import cache from '../cache';
import { parseDisplayName } from '../../../utils';

function publish(updateTerminal, props) {
  if (!draft.current) {
    return updateTerminal(['You have to create a new article first']);
  }

  if (!draft.current.tag) {
    return updateTerminal([
      'You have to set a tag before you can publish the article.',
    ]);
  }

  const login = parseDisplayName(props.user).login;

  updateTerminal(['Saving draft...']);
  return draft
    .save({ isPublished: true })
    .then(() => {
      updateTerminal(['Saved. Publishing...']);
      return draft.publish();
    })
    .then(path => {
      updateTerminal([
        `Published at [/articles/${login}/${draft.current
          .articleName}](/articles/${login}/${draft.current.articleName})`,
      ]);
      cache.updateUrls([
        `/`,
        `/articles/${login}/${draft.current.articleName}`,
        `/tags/${draft.current.tag}`,
      ]);
    });
}

export default publish;
