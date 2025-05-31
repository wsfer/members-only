const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const passport = require('../config/passport');

const userRouter = Router();

userRouter.get('/login', userController.getLoginForm);
userRouter.get('/register', userController.getRegisterForm);
userRouter.post(
  '/login',
  passport.authenticate('local', { successRedirect: '/' })
);
userRouter.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
userRouter.post('/register', userController.createUser);
userRouter.get(
  '/membership',
  auth.isLoggedIn,
  userController.getMembershipForm
);
userRouter.post(
  '/membership',
  auth.isLoggedIn,
  userController.activateMembership
);
userRouter.get(
  '/you-shall-not-pass',
  auth.isLoggedIn,
  userController.getAdminForm
);
userRouter.post(
  '/activate-admin',
  auth.isLoggedIn,
  userController.activateAdmin
);

module.exports = userRouter;
