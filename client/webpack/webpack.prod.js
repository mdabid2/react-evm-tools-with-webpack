const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].chunk.js'
  },

  // plugins: [
  //   new UglifyJsPlugin({
  //     uglifyOptions: {
  //     warnings: false,
  //     ie8: false,
  //     output: {
  //       comments: false
  //     }}
  //   })
  // ]
});
