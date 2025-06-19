const { validationResult } = require('express-validator');
const { postMessage } = require('../middlewares/message.middleware');
const asyncHandler = require('express-async-handler');
const postQueries = require('../database/post.queries');
const commentQueries = require('../database/comment.queries');
const validateComment = require('../middlewares/validateComment.middleware');
const NotFoundError = require('../errors/NotFoundError');

const createComment = [
  validateComment,
  asyncHandler(async (req, res) => {
    // Check if post exists first
    if (!Number.isInteger(Number(req.params.id))) {
      throw new NotFoundError('Content not found');
    }

    const post = await postQueries.getById(req.params.id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formErrors = errors.mapped();
      const formValues = req.body;
      return res.status(400).render('post', { post, formErrors, formValues });
    }

    await commentQueries.createComment({
      postId: req.params.id,
      userId: req.user.account_id,
      message: req.body.comment,
    });
    await postMessage(req, 'Comment created with success', 'success');
    res.redirect(`/posts/${req.params.id}`);
  }),
];

module.exports = { createComment };
