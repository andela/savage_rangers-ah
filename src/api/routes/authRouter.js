import { Router } from 'express';
import ValidateUser from '../../middlewares/ValidateUser';
import authController from '../controllers/authController';

const authRouter = new Router();

authRouter.post('/signup', ValidateUser.validateSignup, authController.signup);
authRouter.post('/login', authController.login);

export default authRouter;
