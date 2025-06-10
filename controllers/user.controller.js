const { validationResult } = require('express-validator');
const { postMessage } = require('../middlewares/message.middleware');
const crypto = require('node:crypto');
const asyncHandler = require('express-async-handler');
const userQueries = require('../database/user.queries');
const postQueries = require('../database/post.queries');
const validateRegister = require('../middlewares/validateRegister.middleware');
const passport = require('../config/passport');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'not secret';

const getUser = asyncHandler(async (req, res) => {
  const posts = await postQueries.getLastPostsFromUser(req.user.account_id);
  res.render('user', { posts });
});

const getLoginForm = asyncHandler(async (req, res) => {
  res.render('login');
});

const getRegisterForm = asyncHandler(async (req, res) => {
  res.render('register');
});

const loginUser = asyncHandler(async (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.render('login', { error: "User or password doesn't exist" });
    }

    req.login(user, async () => {
      await postMessage(req, `Logged in as ${user.username}`, 'success');
      res.redirect('/');
    });
  })(req, res);
});

const createUser = [
  validateRegister,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formErrors = errors.mapped();
      const formValues = req.body;
      return res.status(400).render('register', { formErrors, formValues });
    }

    await userQueries.createUser(req.body);
    await postMessage(req, 'User created with success', 'success');
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
    await userQueries.changeMembership(true, req.user.account_id);
    await postMessage(req, 'Congratulations, you are a member!', 'success');
    return res.redirect('/');
  }

  res.status(400).render('activate-membership', { error: 'Wrong code' });
});

const getAdminForm = asyncHandler(async (req, res) => {
  res.render('activate-admin');
});

const activateAdmin = asyncHandler(async (req, res) => {
  const currentCodeLength = ADMIN_PASSWORD.length;
  const currentCode = Buffer.alloc(currentCodeLength, ADMIN_PASSWORD);
  const sentCode = Buffer.alloc(currentCodeLength, req.body.code);

  if (crypto.timingSafeEqual(sentCode, currentCode)) {
    await userQueries.changeAdmin(true, req.user.account_id);
    await postMessage(req, 'Congratulations, you are an admin!', 'success');
    return res.redirect('/');
  }

  res.status(400).render('activate-admin', { error: 'Wrong code' });
});

module.exports = {
  getUser,
  getLoginForm,
  getRegisterForm,
  loginUser,
  createUser,
  getMembershipForm,
  activateMembership,
  getAdminForm,
  activateAdmin,
};
