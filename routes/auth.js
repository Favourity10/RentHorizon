import express from 'express';
import authController from '../controller/auth.js';
import { authMiddleware } from '../middleware/authmiddleware.js';
const authRoute = express.Router();


authRoute.post('/register', authController.register);
authRoute.post('/registerAdmin', authController.registerAdmin);
authRoute.post('/login', authController.login);
authRoute.post('/refresh', authMiddleware, authController.refreshToken);
authRoute.post('/logout', authMiddleware, authController.logout);



export default authRoute; 