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

const getMembershipForm = asyncHandler(async (req, res) => {
  res.render('activate-membership');
});

const activateMembership = asyncHandler(async (req, res) => {
  const HARDCODED_SECRET_TO_CHANGE_LATER = 'abc123';
  const sentCode = req.body.code;

  if (sentCode === HARDCODED_SECRET_TO_CHANGE_LATER) {
    await userQueries.changeMembership(true, req.user.id);
    return res.redirect('/');
  }

  res.status(400).render('activate-membership', { error: 'Wrong code' });
});

const getAdminForm = asyncHandler(async (req, res) => {
  res.render('activate-admin');
});

const activateAdmin = asyncHandler(async (req, res) => {
  const HARDCODED_SECRET_TO_CHANGE_LATER = 'abc123';
  const sentCode = req.body.code;

  if (sentCode === HARDCODED_SECRET_TO_CHANGE_LATER) {
    await userQueries.changeAdmin(true, req.user.id);
    return res.redirect('/');
  }

  res.status(400).render('activate-admin', { error: 'Wrong code' });
});

module.exports = {
  getLoginForm,
  getRegisterForm,
  createUser,
  getMembershipForm,
  activateMembership,
  getAdminForm,
  activateAdmin,
};
