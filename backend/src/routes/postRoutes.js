import { Router } from 'express';
import { authenticateToken, optionalAuthenticateToken } from '../middlewares/authMiddleware.js';
import { getPosts, getPost, createPost, updatePost, deletePost, savePost, unsavePost } from '../controllers/postController.js';
import { getComments } from '../controllers/commentController.js';

const postRouter = Router();

postRouter.get('/', optionalAuthenticateToken, getPosts);

postRouter.post('/:id/bookmark', authenticateToken, savePost);
postRouter.delete('/:id/bookmark', authenticateToken, unsavePost);

postRouter.get('/:id', getPost);
postRouter.post('/', createPost);
postRouter.put('/:id', authenticateToken, updatePost);
postRouter.delete('/:id', deletePost);

postRouter.get('/:postId', getComments);

export default postRouter;