const util = require('util');
const Eloquent = require('./lib/eloquent');
const transaction = require('./lib/transaction');
const config = require('./lib/config');
const connection = require('./lib/connection');

module.exports = {
  Eloquent,
  config: config.setConfig,
  connect,
  transaction,
};

function connect() {
  connection.getPool(config.getConfig());
}
