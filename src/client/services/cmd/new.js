import draft from '../draft';
import { parseDisplayName } from '../../../utils';

function newCmd(updateTerminal, props) {
  const login = parseDisplayName(props.user).login;

  updateTerminal(['Creating draft...']);
  draft.create(props.user.uid).then(draftKey => {
    updateTerminal(['Draft created, redirecting...']);
    location.href = `/drafts/${login}/${draftKey}`;
  });
}

export default newCmd;
