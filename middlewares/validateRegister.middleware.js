const { body } = require('express-validator');
const userQueries = require('../database/user.queries');

const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Username is too short, should be between 8 and 20 characters')
    .isLength({ max: 20 })
    .withMessage('Username is too long, should be between 8 and 20 characters')
    .custom(async (value) => {
      const existingUser = await userQueries.getByUsername(value);
      if (existingUser) throw new Error('Username is already in use');
    }),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email is invalid')
    .custom(async (value) => {
      const existingUser = await userQueries.getByEmail(value);
      if (existingUser) throw new Error('E-mail already in use');
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password is too short, should be between 8 and 20 characters')
    .isLength({ max: 20 })
    .withMessage('Password is too long, should be between 8 and 20 characters'),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Confirm password field is different from password'),
];

module.exports = validateRegister;
