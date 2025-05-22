const asyncHandler = require('express-async-handler');

const getLoginForm = asyncHandler(async (req, res) => {
  res.render('login');
});

const getRegisterForm = asyncHandler(async (req, res) => {
  res.render('register');
});

const createUser = asyncHandler(async (req, res) => {
  res.redirect('/');
});

module.exports = { getLoginForm, getRegisterForm, createUser };
