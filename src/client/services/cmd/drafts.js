import { parseDisplayName } from '../../../utils';

function drafts(updateTerminal, props) {
  const login = parseDisplayName(props.user).login;

  updateTerminal(['Redirecting you to drafts...']);
  location.href = `/drafts/${login}`;
}

export default drafts;
