const pool = require('../db/pool');

class BaseModel {
  constructor(tableName, idField) {
    this.table = tableName;
    this.id = idField;
  }

  async insert(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const { rows } = await pool.query(
      `INSERT INTO ${this.table} (${keys.join(', ')})
       VALUES (${placeholders})
       RETURNING *`,
      values
    );

    return rows[0];
  }

  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM ${this.table} WHERE ${this.id} = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    const { rows } = await pool.query(
      `UPDATE ${this.table}
       SET ${setClause}
       WHERE ${this.id} = $${keys.length + 1}
       RETURNING *`,
      [...values, id]
    );

    return rows[0];
  }

  async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM ${this.table}
       WHERE ${this.id} = $1
       RETURNING *`,
      [id]
    );

    return rows[0];
  }
}

module.exports = BaseModel;
