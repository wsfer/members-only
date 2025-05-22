const asyncHandler = require('express-async-handler');
const userQueries = require('../database/user.queries');

const getLoginForm = asyncHandler(async (req, res) => {
  res.render('login');
});

const getRegisterForm = asyncHandler(async (req, res) => {
  res.render('register');
});

const createUser = asyncHandler(async (req, res) => {
  await userQueries.createUser(req.body);
  res.redirect('/');
});

module.exports = { getLoginForm, getRegisterForm, createUser };
