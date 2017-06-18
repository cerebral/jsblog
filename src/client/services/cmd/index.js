import edit from './edit';
import help from './help';
import newCmd from './new';
import publish from './publish';
import tag from './tag';
import theme from './theme';
import upload from './upload';
import components from './components';

const commands = {
  edit,
  help,
  new: newCmd,
  publish,
  tag,
  theme,
  upload,
  components,
};

export default {
  run(text, props, updateTerminal) {
    const textArgs = text.split(' ');
    const domain = textArgs[0];
    const command = textArgs[1];
    const args = textArgs.slice(2);

    if (domain !== 'jsblog') {
      return updateTerminal(['You have to start your command with **jsblog**']);
    }

    if (!commands[command]) {
      return updateTerminal([`Sorry, the command **${command}** is unknown`]);
    }

    commands[command].apply(null, [updateTerminal, props].concat(args || []));
  },
  getTerminalOutput(text, props) {
    let output = [];
    this.run(text, props, terminalOutput => {
      output = terminalOutput;
    });

    return output;
  },
};
