const { Router } = require('express');
const userController = require('../controllers/user.controller');
const isLoggedIn = require('../middlewares/isLoggedIn.middleware');
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
userRouter.get('/membership', userController.getMembershipForm);
userRouter.post('/membership', isLoggedIn, userController.activateMembership);
userRouter.get('/you-shall-not-pass', isLoggedIn, userController.getAdminForm);
userRouter.post('/activate-admin', isLoggedIn, userController.activateAdmin);

module.exports = userRouter;
