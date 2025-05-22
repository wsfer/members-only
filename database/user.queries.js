const pool = require('../config/pool');

async function createUser({ username, email, password }) {
  await pool.query(
    `INSERT INTO account (username, email, password) VALUES ($1, $2, $3)`,
    [username, email, password]
  );
}

module.exports = { createUser };
