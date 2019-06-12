import { Router } from 'express';
import authController from '../controllers/authController';
import validateInputs from '../../middlewares/validations/body.inputs';
import verifyBody from '../../middlewares/body.verifier';
import validateResetEmail from '../../middlewares/validations/validate.reset.email';
import validateResetLink from '../../middlewares/validations/validate.reset.link';
import validateUpdatePassword from '../../middlewares/validations/validate.update.password';

const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

export default authRouter;
