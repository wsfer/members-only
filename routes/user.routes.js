const { Router } = require('express');
const userController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get('/login', userController.getLoginForm);
userRouter.get('/register', userController.getRegisterForm);
userRouter.post('/login', (req, res) => res.redirect('/')); // Passport.js should be here
userRouter.post('/register', userController.createUser);

module.exports = userRouter;
