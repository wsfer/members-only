const { Router } = require('express');
const commentController = require('../controllers/comment.controller');
const NotFoundError = require('../errors/NotFoundError');

const commentRouter = Router();

commentRouter.use(() => {
  throw new NotFoundError('Content not found');
});

module.exports = commentRouter;
