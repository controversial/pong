/* eslint-disable no-console */

const path = require('path');

// Disable deprecation warnings
process.noDeprecation = true;

module.exports = {
  entry: {
    main: path.join(__dirname, 'app/src'),
  },

  module: {
    rules: [
      // CSS files
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      // JavaScript files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // HTML files
      {
        test: /\.html$/,
        loaders: [
          'file-loader?name=[name].html',
          'extract-loader',
          'html-loader',
        ],
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: '/build/',
    filename: 'index.js',
  },

  // --------------------------------------------------------------------------

  devServer: {
    contentBase: path.join(__dirname, 'app'),
    historyApiFallback: true,
    noInfo: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};
