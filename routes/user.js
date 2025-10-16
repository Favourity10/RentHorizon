import express from 'express';
import userController from '../controller/user.js';
import { authMiddleware } from '../middleware/authmiddleware.js';
const userRouter = express.Router();


userRouter.get('/profile', authMiddleware, userController.getProfile);
userRouter.put('/profile', authMiddleware, userController.updateProfile);
userRouter.get('/bookings', authMiddleware, userController.getUserBookings);
// // 


export default userRouter;