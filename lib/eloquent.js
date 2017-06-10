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


  query(sql, params) {
    const connection = this.getConnection(config.getConfig());
    const query = util.promisify(connection.query.bind(connection));
    return query(sql, params);
  }


  // CONDITIONS

  where(col, value) {
    this.sql = `WHERE \`${col}\`='${value}'`;
    return this;
  }

  and(col, value) {
    this.sql += ` AND \`${col}\`='${value}'`;
    return this;
  }


  // SELECT

  get(...columns) {
    let params;
    let sql;

    if (columns.length) {
      sql = `SELECT ?? FROM ?? ${this.sql};`;
      params = [].concat(columns).concat(this.table);
    } else {
      sql = `SELECT * FROM ?? ${this.sql};`;
      params = [].concat(this.table);
    }

    return this.query(sql, params).then((results, fields) => results);
  }

  find(id) {
    if (!this.primary) throw 'No primary defined in the model.';
    return this.where(this.primary, id).get();
  }

  findOne(id) {
    return this.find(id).then((results, fields) => results[0]);
  }

  count() {
    const sql = `SELECT COUNT(1) FROM ?? ${this.sql};`;
    const params = [].concat(this.table);

    return this.query(sql, params).then((results, fields) => results);
  }


  // INSERT

  insert(values) {
    const sql = `INSERT INTO ?? SET ?`;
    const params = [].concat(this.table).concat(values);

    return this.query(sql, params).then((results, fields) => results.insertId);
  }

  // UPDATE

  update(values) {
    if (values === undefined && !this.sql.startsWith('WHERE')) {
      throw 'there is no where clause';
      return;
    }

    const sql = `UPDATE ?? SET ? ${this.sql}`;
    const params = [].concat(this.table).concat(values);

    return this.query(sql, params).then((results, fields) => results);
  }

  // DELETE

  delete(id) {
    if (id === undefined && !this.sql.startsWith('WHERE')) {
      throw 'there is no where clause or id';
      return;
    }

    const params = [].concat(this.table);

    if (id !== undefined) {
      this.sql = `WHERE ${this.primary} = ?`
      params.push(id);
    }

    const sql = `DELETE FROM ?? ${this.sql}`;
    return this.query(sql, params).then((results, fields) => results);
  }
}

module.exports = Eloquent;
