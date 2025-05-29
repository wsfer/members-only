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

async function deletePost(id) {
  await pool.query('DELETE FROM post WHERE id = $1', [id]);
}

module.exports = { getPosts, createPost, deletePost };
