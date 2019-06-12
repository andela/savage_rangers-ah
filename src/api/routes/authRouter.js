import { Router } from 'express';
import authController from '../controllers/authController';
import signout from '../controllers/signout';


const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/signout', signout.signout);


export default authRouter;
