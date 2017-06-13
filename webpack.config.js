'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const babelRc = JSON.parse(
  fs.readFileSync(path.resolve('.babelrc')).toString()
);

module.exports = function(env) {
  const rules = [
    {
      test: /\.js?$/,
      include: [path.resolve('src')],
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
    performance: {
      hints: isProduction ? 'warning' : false,
    },
    entry: {
      main: path.resolve('src', 'client', 'index.js'),
      common: ['preact', 'firebase'],
    },
    output: {
      path: path.resolve('public'),
      filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
      chunkFilename: isProduction ? '[chunkhash].js' : '[id].js',
      publicPath: '/',
    },
    module: {
      rules: rules,
    },
    devServer: {
      port: 3000,
      proxy: {
        '/': 'http://localhost:3001',
      },
      hot: false,
      inline: false,
    },
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.resolve('src', 'client', 'serviceworker', 'index.js'),
      }),
    ].concat(
      isProduction
        ? [
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
              names: ['common', 'manifest'],
            }),
            new webpack.optimize.UglifyJsPlugin({
              beautify: false,
              comments: false,
              compress: {
                warnings: false,
                drop_console: true,
              },
              mangle: {
                except: ['webpackJsonp'],
                screw_ie8: true,
              },
            }),
          ]
        : [
            new webpack.optimize.CommonsChunkPlugin({
              names: ['common'],
            }),
          ]
    ),
  };
};
