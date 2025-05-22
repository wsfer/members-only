const asyncHandler = require('express-async-handler');

const getPosts = asyncHandler(async (req, res) => {
  res.render('index');
});

const createPost = asyncHandler(async (req, res) => {
  res.redirect('/');
});

module.exports = { getPosts, createPost };
