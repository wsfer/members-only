const asyncHandler = require('express-async-handler');
const postQueries = require('../database/post.queries');

const getIndexPage = asyncHandler(async (req, res) => {
  res.render('index');
});

const getPostForm = asyncHandler(async (req, res) => {
  res.render('post-form');
});

const getPosts = asyncHandler(async (req, res) => {
  res.render('posts');
});

const createPost = asyncHandler(async (req, res) => {
  await postQueries.createPost({ ...req.body, userId: req.user.id });
  res.redirect('/');
});

const deletePost = asyncHandler(async (req, res) => {
  res.redirect('/');
});

module.exports = {
  getIndexPage,
  getPostForm,
  getPosts,
  createPost,
  deletePost,
};
