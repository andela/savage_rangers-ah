import { Router } from 'express';
import AuthController from '../controllers/authController';
import errorHandler from '../../middlewares/errorHandler';

const authRouter = Router();

authRouter.post('/signup', errorHandler(AuthController.signup));
authRouter.post('/login', errorHandler(AuthController.login));

export default authRouter;
