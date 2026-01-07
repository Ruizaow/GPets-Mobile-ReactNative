import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getPosts, getPost, createPost, deletePost, savePost, unsavePost } from '../controllers/postController.js';

const postRouter = Router();

postRouter.get('/', getPosts);

postRouter.post('/:id/bookmark', authenticateToken, savePost);
postRouter.delete('/:id/bookmark', authenticateToken, unsavePost);

postRouter.get('/:id', getPost);
postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);

export default postRouter;