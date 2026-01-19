import express from 'express';
import { registerUser } from '../controllers/userControllers';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);


//this is the protected route
userRouter.get('/profile', protect, getUserProfile);

export default userRouter;