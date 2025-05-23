const { Router } = require('express');
const userController = require('../controllers/user.controller');
const passport = require('../config/passport');

const userRouter = Router();

userRouter.get('/login', userController.getLoginForm);
userRouter.get('/register', userController.getRegisterForm);
userRouter.post(
  '/login',
  passport.authenticate('local', { successRedirect: '/' })
);
userRouter.post('/register', userController.createUser);

module.exports = userRouter;
