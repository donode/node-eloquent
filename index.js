const Eloquent = require('./lib/eloquent');
const config = require('./lib/config');

module.exports = {
  Eloquent,
  config: config.setConfig,
};
