const utils = require('./utils');
const path = require('path');

function writeAppConfig() {
  return utils
    .readDir(path.resolve('public'))
    .then(files => {
      return files.filter(file => path.extname(file) === '.js');
    })
    .then(files => {
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
    .then(scripts => {
      return utils.writeFile(
        path.resolve('functions', 'app.config.json'),
        JSON.stringify(
          {
            scripts,
          },
          null,
          2
        )
      );
    })
    .then(() => {
      console.log('Done writing app config');
    })
    .catch(err => {
      console.log('Error writing app config', err);
    });
}

function writeManifest() {
  return utils
    .readFile(path.resolve('public', 'manifest.json'))
    .then(content => {
      return JSON.parse(content);
    })
    .then(manifest => {
      manifest.gcm_sender_id = process.env.GCM_SENDER_ID;

      return manifest;
    })
    .then(manifest => {
      return utils.writeFile(
        'public',
        'manifest.json',
        JSON.stringify(manifest, null, 2)
      );
    });
}

Promise.all([writeAppConfig(), writeManifest()])
  .then(() => {
    console.log('Updated config!');
  })
  .catch(error => {
    console.log('Something went wrong writing configs', error);
  });
