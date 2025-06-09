const { validationResult } = require('express-validator');
const { postMessage } = require('../middlewares/message.middleware');
const asyncHandler = require('express-async-handler');
const postQueries = require('../database/post.queries');
const validatePost = require('../middlewares/validatePost.middleware');
const NotFoundError = require('../errors/NotFoundError');

const getIndexPage = asyncHandler(async (req, res) => {
  const trendyPosts = await postQueries.getTrendyPosts();
  res.render('index', { posts: trendyPosts });
});

const getPostForm = asyncHandler(async (req, res) => {
  res.render('post-form');
});

const getPosts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const search = req.query.search || '';

  // Limit page number to be between 1 and 100
  if (!Number.isInteger(page) || page < 1 || page > 100) {
    throw new NotFoundError('Content not found');
  }

  const result = await postQueries.getPosts({ page, search });
  res.render('posts', { result });
});

const createPost = [
  validatePost,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formErrors = errors.mapped();
      const formValues = req.body;
      return res.status(400).render('post-form', { formErrors, formValues });
    }

    await postQueries.createPost({ ...req.body, userId: req.user.id });
    await postMessage(req, 'Post created with success', 'success');
    res.redirect('/posts');
  }),
];

const deletePost = asyncHandler(async (req, res) => {
  // Check if user is allowed to delete post
  if (!req.user.is_admin) {
    const postToDelete = await postQueries.getById(req.params.id);

    if (req.user.id !== postToDelete.created_by) {
      await postMessage(req, 'Not allowed to delete this post', 'failure');
      return res.status(401).redirect('/posts');
    }
  }

  await postQueries.deletePost(req.params.id);
  await postMessage(req, `Post #${req.params.id} deleted`);
  res.redirect('/posts');
});

module.exports = {
  getIndexPage,
  getPostForm,
  getPosts,
  createPost,
  deletePost,
};
