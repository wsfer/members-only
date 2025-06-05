const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

const userRouter = Router();

userRouter.get('/', auth.isLoggedIn, userController.getUser);
userRouter.get('/login', userController.getLoginForm);
userRouter.get('/register', userController.getRegisterForm);
userRouter.post('/login', userController.loginUser);
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
