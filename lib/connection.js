const mysql = require('mysql');
const util = require('util');

class Connection {
  constructor() {
    this.pool = null;
  }

  getPool(config) {
    if (!this.pool) {
      this.pool = mysql.createPool(config);
    }
    return this.pool;
  }

  getConnection() {
    if (!this.pool) {
      throw 'could not get connection';
      return;
    }
    return this.pool;
  }

  async getNewConnection() {
    if (!this.pool) {
      throw 'could not get connection';
      return;
    }
    const _connection = util.promisify(this.pool.getConnection.bind(this.pool));
    return await _connection();
  }

}

module.exports = new Connection();
