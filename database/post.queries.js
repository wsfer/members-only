const pool = require('../config/pool');

const LIMIT_PER_PAGE = 10;

async function getTrendyPosts() {
  const { rows } = await pool.query(`
    SELECT * FROM post JOIN account
    ON post.created_by = account.account_id
    ORDER BY created_at DESC
    LIMIT 5;
  `);
  return rows;
}

async function getPosts({ page, search }) {
  const offset = (page - 1) * LIMIT_PER_PAGE;

  const posts = await pool.query(
    `
    SELECT * FROM post JOIN account
    ON post.created_by = account.account_id
    WHERE post.title LIKE $1
    ORDER BY created_at DESC
    LIMIT ${LIMIT_PER_PAGE} OFFSET ${offset}
  `,
    [`%${search}%`]
  );

  const resultCount = await pool.query(
    'SELECT COUNT(post_id) FROM post WHERE title LIKE $1',
    [`%${search}%`]
  );

  return {
    posts: posts.rows,
    total: Number(resultCount.rows[0].count),
    limit: LIMIT_PER_PAGE,
    pages: Math.ceil(Number(resultCount.rows[0].count) / LIMIT_PER_PAGE) || 1,
    page,
    search,
  };
}

async function getLastPostsFromUser(id) {
  const { rows } = await pool.query(
    `
    SELECT * FROM post JOIN account
    ON post.created_by = account.account_id
    WHERE account.account_id = $1
    ORDER BY created_at DESC
    LIMIT 5;  
  `,
    [id]
  );
  return rows;
}

async function getById(id) {
  const { rows } = await pool.query(
    `
    SELECT * FROM post JOIN account
    ON post.created_by = account.account_id
    WHERE post.post_id = $1
  `,
    [id]
  );
  return rows[0];
}

async function createPost({ title, message, userId }) {
  await pool.query(
    `INSERT INTO post (title, message, created_by) VALUES ($1, $2, $3)`,
    [title, message, userId]
  );
}

async function deletePost(id) {
  await pool.query('DELETE FROM post WHERE post_id = $1', [id]);
}

module.exports = {
  getTrendyPosts,
  getPosts,
  getLastPostsFromUser,
  getById,
  createPost,
  deletePost,
};
