const { body } = require('express-validator');

const validateComment = [
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ max: 400 })
    .withMessage('Comment is too long, should have maximum 400 characters'),
];

module.exports = validateComment;
