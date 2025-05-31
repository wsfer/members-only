const { validationResult } = require('express-validator');
const { postMessage } = require('../middlewares/message.middleware');
const asyncHandler = require('express-async-handler');
const postQueries = require('../database/post.queries');
const validatePost = require('../middlewares/validatePost.middleware');

const getIndexPage = asyncHandler(async (req, res) => {
  const trendyPosts = await postQueries.getTrendyPosts();
  res.render('index', { posts: trendyPosts });
});

const getPostForm = asyncHandler(async (req, res) => {
  res.render('post-form');
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await postQueries.getPosts();
  res.render('posts', { posts });
});

const createPost = [
  validatePost,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formErrors = errors.array();
      const formValues = req.body;
      return res.status(400).render('post-form', { formErrors, formValues });
    }

    await postQueries.createPost({ ...req.body, userId: req.user.id });
    await postMessage(req, 'Post created with success');
    res.redirect('/posts');
  }),
];

const deletePost = asyncHandler(async (req, res) => {
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
