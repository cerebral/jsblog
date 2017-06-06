const utils = require('./utils');
const path = require('path');
const appConfig = require('../app.config.json');

utils.readDir(path.resolve('public'))
  .then((files) => {
    return files.filter((file) => path.extname(file) === '.js');
  })
  .then((files) => {
    return files.reduce((scripts, file) => {
      if (file.indexOf('manifest') === 0) {
        scripts[0] = file;
      } else if (file.indexOf('common') === 0) {
        scripts[1] = file;
      } else if (file.indexOf('main') === 0) {
        scripts[2] = file;
      }

      return scripts;
    }, []);
  })
  .then((scripts) => {
    appConfig.production.scripts = scripts;

    return utils.writeFile(path.resolve('app.config.json'), JSON.stringify(appConfig, null, 2));
  })
  .then(() => {
    console.log('Done writing app config');
  })
  .catch((err) => {
    console.log('Error writing app config', err);
  })
