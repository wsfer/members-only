const { Router } = require('express');
const postController = require('../controllers/post.controller');
const isLoggedIn = require('../middlewares/isLoggedIn.middleware');

const postRouter = Router();

postRouter.get('/', postController.getIndexPage);
postRouter.get('/new-post', isLoggedIn, postController.getPostForm);
postRouter.post('/new-post', isLoggedIn, postController.createPost);
postRouter.get('/posts', postController.getPosts);
postRouter.post('/delete', postController.deletePost);

module.exports = postRouter;
