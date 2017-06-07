var mysql = require('mysql');
const util = require('./util');
const Connection = require('./connection');
const config = require('./config');

class Eloquent extends Connection {
  constructor() {
    super();

    this.table = '';
    this.primary = 'id';

    this.allow = [];
    this.restrict = [];

    this.sql = '';

  }

  _init() {
    if (!this.connection) {
      this.connection = this.getConnection(config.getConfig());
    }
  }

  where(col, value) {
    this.sql = `WHERE \`${col}\`='${value}'`;
    return this;
  }

  and(col, value) {
    this.sql += ` AND \`${col}\`='${value}'`;
    return this;
  }

  get(...columns) {
    this._init();

    const cols = columns.length ? columns.map(c=>`\`${c}\``).join(',') : '*'
    this.sql = `SELECT ${cols} FROM \`${this.table}\` ${this.sql};`;

    const query = util.promisify(this.connection.query.bind(this.connection));
    return query(this.sql).then((results, fields) => results);
  }

  find(id) {
    if (!this.primary) throw 'No primary defined in the model.';
    return this.where(this.primary, id).get();
  }

  findOne(id) {
    return this.find(id).then((results, fields) => results[0]);
  }
}

module.exports = Eloquent;
