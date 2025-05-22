const { Router } = require('express');
const postController = require('../controllers/post.controller');

const postRouter = Router();

postRouter.get('/', postController.getPosts);
postRouter.post('/', postController.createPost);

module.exports = postRouter;
