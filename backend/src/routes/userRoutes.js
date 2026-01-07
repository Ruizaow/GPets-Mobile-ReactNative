import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser, getUserBookmarks } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id/bookmarks', getUserBookmarks);

userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;