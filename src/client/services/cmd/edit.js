import { parseDisplayName } from '../../../utils';

function edit(updateTerminal, props) {
  const ownerLogin = location.pathname.split('/')[2];
  const login = parseDisplayName(props.user).login;

  if (ownerLogin !== login) {
    return updateTerminal(['This is not your article!']);
  }

  const articleId = document.querySelector('article').id;

  if (!articleId) {
    return updateTerminal(['No article to edit on this page.']);
  }

  updateTerminal(['Redirecting you to the draft...']);
  location.href = `/drafts/${ownerLogin}/${articleId}`;
}

export default edit;
