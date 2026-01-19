import express from 'express';
import protect from '../middleware/authMiddleware.js';


import { registerUser, loginUser, getUserProfile } from '../controllers/userControllers.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);


//this is the protected route
userRouter.get('/profile', protect, getUserProfile);

export default userRouter;