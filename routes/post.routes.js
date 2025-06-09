const { Router } = require('express');
const postController = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');
const NotFoundError = require('../errors/NotFoundError');

const postRouter = Router();

postRouter.get('/', postController.getIndexPage);
postRouter.get('/new-post', auth.isLoggedIn, postController.getPostForm);
postRouter.post('/new-post', auth.isLoggedIn, postController.createPost);
postRouter.get('/posts', postController.getPosts);
postRouter.post('/delete-post/:id', auth.isLoggedIn, postController.deletePost);
postRouter.use(() => {
  throw new NotFoundError('Content not found');
});

module.exports = postRouter;
