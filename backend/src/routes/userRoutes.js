import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getUsers, getUser, createUser, updateUser, deleteUser, getUserPosts, getUserBookmarks } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id/posts', authenticateToken, getUserPosts);
userRouter.get('/:id/bookmarks', authenticateToken, getUserBookmarks);

userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;