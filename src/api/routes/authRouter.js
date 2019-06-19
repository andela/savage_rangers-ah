import { Router } from 'express';
import authController from '../controllers/authController';
import EmailVerifier from '../controllers/verifyEmail';

const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/verifyEmail/:token', EmailVerifier.verifyEmail);


export default authRouter;
