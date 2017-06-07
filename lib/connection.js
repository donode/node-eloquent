const mysql = require('mysql');

class Connection {
  constructor() {}

  getConnection(config) {
    return mysql.createPool(config);
  }
}

module.exports = Connection;
