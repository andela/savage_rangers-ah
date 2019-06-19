import { Router } from 'express';
import authController from '../controllers/authController';

const authRouter = new Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

export default authRouter;
