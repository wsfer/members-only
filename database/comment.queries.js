const pool = require('../config/pool');

async function getByPost(postId) {
  const { rows } = await pool.query(
    `SELECT * FROM comment JOIN account
    ON comment.account_id = account.account_id
    WHERE post_id = $1`,
    [postId]
  );
  return rows;
}

async function createComment({ postId, userId, message }) {
  await pool.query(
    `INSERT INTO comment (post_id, account_id, message) VALUES ($1, $2, $3)`,
    [postId, userId, message]
  );
}

module.exports = { getByPost, createComment };
