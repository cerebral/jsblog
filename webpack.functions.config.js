'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');

const babelRc = JSON.parse(
  fs.readFileSync(path.resolve('.babelrc')).toString()
);

module.exports = function(env) {
  const rules = [
    {
      test: /\.js?$/,
      include: [
        path.resolve('src')
      ],
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
            ],
          },
        },
      ],
    },
  ];

  /*
   CONFIG
   */
  return {
    target: 'node',
    externals: [nodeExternals()],
    performance: {
      hints: isProduction ? 'warning' : false,
    },
    entry: path.resolve('src', 'app', 'index.js'),
    output: {
      library: 'app',
      path: path.resolve('functions'),
      filename: 'app.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: rules,
    },
    resolve: {
      alias: Object.keys(babelRc.plugins[0][1].alias).reduce((alias, key) => {
        alias[key] = path.resolve(babelRc.plugins[0][1].alias[key]);

        return alias;
      }, {}),
    },
  };
};
