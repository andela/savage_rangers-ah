import { Router } from 'express';
import authController from '../controllers/authController';
import validateToken from '../../middlewares/checkValidToken';


const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/signout', validateToken, authController.signout);

export default authRouter;
