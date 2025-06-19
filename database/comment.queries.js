const pool = require('../config/pool');

async function createComment({ postId, userId, message }) {
  await pool.query(
    `INSERT INTO comment (post_id, account_id, message) VALUES ($1, $2, $3)`,
    [postId, userId, message]
  );
}

module.exports = { createComment };
