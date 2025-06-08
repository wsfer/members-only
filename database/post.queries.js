const pool = require('../config/pool');

const LIMIT_PER_PAGE = 10;

async function getTrendyPosts() {
  const { rows } = await pool.query(`
    SELECT
      post.id, post.title, post.message, post.created_at, post.created_by,
      account.username, account.email, account.is_member, account.is_admin
    FROM post JOIN account
    ON post.created_by = account.id
    ORDER BY created_at DESC
    LIMIT 5;
  `);
  return rows;
}

async function getPosts({ page, search }) {
  const offset = (page - 1) * LIMIT_PER_PAGE;

  const posts = await pool.query(
    `
    SELECT
      post.id, post.title, post.message, post.created_at, post.created_by,
      account.username, account.email, account.is_member, account.is_admin
    FROM post JOIN account
    ON post.created_by = account.id
    WHERE post.title LIKE $1
    ORDER BY created_at DESC
    LIMIT ${LIMIT_PER_PAGE} OFFSET ${offset}
  `,
    [`%${search}%`]
  );

  const resultCount = await pool.query(
    'SELECT COUNT(id) FROM post WHERE title LIKE $1',
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
    SELECT
      post.id, post.title, post.message, post.created_at, post.created_by,
      account.username, account.email, account.is_member, account.is_admin
    FROM post JOIN account
    ON post.created_by = account.id
    WHERE account.id = $1
    ORDER BY created_at DESC
    LIMIT 5;  
  `,
    [id]
  );
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

module.exports = {
  getTrendyPosts,
  getPosts,
  getLastPostsFromUser,
  createPost,
  deletePost,
};
