const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

// Note: defined here because it will be used more than once.


module.exports = merge(commonConfig, {
  devtool: 'eval-source-map',

  mode: 'development',

  entry: {
    'app': [
      'webpack-hot-middleware/client?reload=true'
    ]
  },

  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },


  devServer: {
    contentBase: '/temp', //Not in use
    historyApiFallback: true,
    compress: true,
    port: 9000,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
});
