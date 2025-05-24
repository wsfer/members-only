const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const userQueries = require('../database/user.queries');
const validateRegister = require('../middlewares/validateRegister.middleware');

const getLoginForm = asyncHandler(async (req, res) => {
  res.render('login');
});

const getRegisterForm = asyncHandler(async (req, res) => {
  res.render('register');
});

const createUser = [
  validateRegister,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formErrors = errors.array();
      const formValues = req.body;
      return res.status(400).render('register', { formErrors, formValues });
    }

    await userQueries.createUser(req.body);
    res.redirect('/');
  }),
];

module.exports = { getLoginForm, getRegisterForm, createUser };
