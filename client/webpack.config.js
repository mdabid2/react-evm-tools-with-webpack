/*
  To Set NODE_ENV=production or NODE_ENV=development

  ####################
  linux & mac: export NODE_ENV=production
  windows: $env:NODE_ENV = 'production'
  ####################
*/

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webpack/webpack.prod');
    break;

  case 'dev':
  case 'development':
  default:
    module.exports = require('./webpack/webpack.dev');
    //Combined files in single js
    //module.exports = require('./webpack.devServe');
}
