const util = require('util');
const connection = require('./connection');

class Transaction {
  constructor() {}

  async begin() {
    const _conn = await connection.getNewConnection();
    const _beginTransaction = util.promisify(_conn.beginTransaction.bind(_conn));
    await _beginTransaction();
    return _conn;
  }

  async commit(connection) {
    const _commit = util.promisify(connection.commit.bind(connection));
    await _commit();
    connection.release();
  }

  async rollback(connection) {
    const _rollback = util.promisify(connection.rollback.bind(connection));
    await _rollback();
    connection.release();
  }

}

module.exports = new Transaction();
