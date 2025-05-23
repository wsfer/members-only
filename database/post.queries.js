const pool = require('../config/pool');

async function getPosts() {
  const { rows } = await pool.query('SELECT * FROM post');
  return rows;
}

async function createPost({ title, message, userId }) {
  await pool.query(
    `INSERT INTO post (title, message, created_by) VALUES ($1, $2, $3)`,
    [title, message, userId]
  );
}

module.exports = { getPosts, createPost };
