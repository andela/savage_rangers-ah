import { Router } from 'express';
import ValidateUser from '../../middlewares/ValidateUser';
import authController from '../controllers/authController';
import validateToken from '../../middlewares/checkValidToken';


const authRouter = new Router();

authRouter.post('/signup', ValidateUser.validateSignup, authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/signout', validateToken, authController.signout);

export default authRouter;
