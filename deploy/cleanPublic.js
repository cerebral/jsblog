const utils = require('./utils');
const path = require('path');

utils.readDir(path.resolve('public'))
  .then((files) => {
    return files.filter(file => path.extname(file) === '.js')
  })
  .then((files) => {
    return Promise.all(files.map((file) => {
      return utils.removeFile(path.resolve('public', file));
    }));
  })
  .then(() => {
    console.log('Done removing files');
  })
  .catch((err) => {
    console.log('Error removing files', err);
  });
