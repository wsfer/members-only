const { Router } = require('express');
const commentController = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');
const NotFoundError = require('../errors/NotFoundError');

const commentRouter = Router();

commentRouter.post('/:id', auth.isLoggedIn, commentController.createComment);
commentRouter.use(() => {
  throw new NotFoundError('Content not found');
});

module.exports = commentRouter;
