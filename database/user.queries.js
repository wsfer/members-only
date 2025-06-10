const pool = require('../config/pool');
const bcrypt = require('bcryptjs');

async function getById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM account WHERE account_id = $1',
    [id]
  );
  return rows[0];
}

async function getByUsername(username) {
  const { rows } = await pool.query(
    'SELECT * FROM account WHERE username = $1',
    [username]
  );
  return rows[0];
}

async function getByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM account WHERE email = $1', [
    email,
  ]);
  return rows[0];
}

async function createUser(userData) {
  const { username, email, profileEmoji, profileColor } = userData;
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await pool.query(
    `
    INSERT INTO account (username, email, password, profile_emoji, profile_color)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [username, email, hashedPassword, profileEmoji, profileColor]
  );
}

async function changeMembership(booleanValue, userId) {
  await pool.query('UPDATE account SET is_member = $1 WHERE account_id = $2', [
    booleanValue,
    userId,
  ]);
}

async function changeAdmin(booleanValue, userId) {
  await pool.query('UPDATE account SET is_admin = $1 WHERE account_id = $2', [
    booleanValue,
    userId,
  ]);
}

module.exports = {
  getById,
  getByUsername,
  getByEmail,
  createUser,
  changeMembership,
  changeAdmin,
};
