const { Router } = require('express');
const postController = require('../controllers/post.controller');

const postRouter = Router();

postRouter.get('/', postController.getIndexPage);
postRouter.get('/new-post', postController.getPostForm);
postRouter.post('/new-post', postController.createPost);
postRouter.get('/posts', postController.getPosts);
postRouter.post('/delete', postController.deletePost);

module.exports = postRouter;
