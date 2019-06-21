import { Router } from 'express';
import ValidateUser from '../../middlewares/ValidateUser';
import authController from '../controllers/authController';
import EmailVerifier from '../controllers/verifyEmail';

const authRouter = new Router();

authRouter.post('/signup', ValidateUser.validateSignup, authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/verifyEmail/:token', EmailVerifier.verifyEmail);


export default authRouter;
