const pool = require('../config/pool');

async function getTrendyPosts() {
  const { rows } = await pool.query(`
    SELECT
      post.id, post.title, post.message,
      account.username, account.email, account.is_member, account.is_admin
    FROM post JOIN account
    ON post.created_by = account.id
    ORDER BY created_at DESC
    LIMIT 5;
  `);
  return rows;
}

// TODO: add pagination
async function getPosts() {
  const { rows } = await pool.query(`
    SELECT
      post.id, post.title, post.message,
      account.username, account.email, account.is_member, account.is_admin
    FROM post JOIN account
    ON post.created_by = account.id
    ORDER BY created_at DESC
  `);
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
