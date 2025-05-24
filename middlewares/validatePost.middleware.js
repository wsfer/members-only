const { body } = require('express-validator');

const validatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title is too long, should have maximum 100 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 400 })
    .withMessage('Message is too long, should have maximum 400 characters'),
];

module.exports = validatePost;
