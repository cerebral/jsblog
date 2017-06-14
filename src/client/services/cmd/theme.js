import authentication from '../authentication';
import cache from '../cache';

const themes = ['hund', 'mostly-bright'];

function theme(updateTerminal, props, name) {
  if (!name) {
    return updateTerminal([
      '### Available themes',
      '- hund',
      '- mostly-bright',
    ]);
  }

  if (themes.indexOf(name) === -1) {
    return updateTerminal(['You have not given a valid theme']);
  }

  updateTerminal(['Updating theme...']);
  return authentication
    .updateTheme(name)
    .then(() => {
      return authentication.getToken(true);
    })
    .then(token => {
      authentication.writeCookie(token);
      cache.clearAll();
      updateTerminal(['Theme updated, reloading app']);
      location.reload();
    });
}

export default theme;
