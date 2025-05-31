const pool = require('../config/pool');

async function getTrendyPosts() {
  const { rows } = await pool.query(`
    SELECT * FROM post
    ORDER BY created_at DESC
    LIMIT 5;
  `);
  return rows;
}

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

module.exports = { getTrendyPosts, getPosts, createPost, deletePost };
