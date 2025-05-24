const pool = require('../config/pool');
const bcrypt = require('bcryptjs');

async function getById(id) {
  const { rows } = await pool.query('SELECT * FROM account WHERE id = $1', [
    id,
  ]);
  return rows[0];
}

async function getByUsername(username) {
  const { rows } = await pool.query(
    'SELECT * FROM account WHERE username = $1',
    [username]
  );
  return rows[0];
}

async function createUser({ username, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO account (username, email, password) VALUES ($1, $2, $3)`,
    [username, email, hashedPassword]
  );
}

async function changeMembership(booleanValue, userId) {
  await pool.query('UPDATE account SET is_member = $1 WHERE id = $2', [
    booleanValue,
    userId,
  ]);
}

module.exports = { getById, getByUsername, createUser, changeMembership };
