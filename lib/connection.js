const mysql = require('mysql');

class Connection {
  constructor() {
    this.pool = null;
  }

  getConnection(config) {
    if (!this.pool) {
      this.pool = mysql.createPool(config);
    }
    return this.pool;
  }
}

module.exports = Connection;
