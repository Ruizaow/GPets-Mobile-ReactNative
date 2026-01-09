import { Router } from 'express';
import { getComments, getComment, createComment, deleteComment } from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/:id', getComment);
commentRouter.post('/', createComment);
commentRouter.delete('/:id', deleteComment);

export default commentRouter;