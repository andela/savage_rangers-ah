import { Router } from 'express';
import signoutController from '../controllers/signout';

const authRouter = Router();
const { signout } = signoutController;

authRouter.get('/signout', signout);

export default authRouter;
