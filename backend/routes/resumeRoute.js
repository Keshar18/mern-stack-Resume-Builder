import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createResume, getUserResumes, updateResume, deleteResume } from '../controllers/resumeController.js';

const resumeRouter = express.Router()

resumeRouter.post('/', protect, createResume)
resumeRouter.get('/', protect, getUserResumes)
resumeRouter.put('/:id', protect, updateResume)
resumeRouter.delete('/:id', protect, deleteResume)

export default resumeRouter;