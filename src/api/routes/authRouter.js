import { Router } from 'express';
import authController from '../controllers/authController';
import validateInputs from '../../middlewares/validations/body.inputs';
import verifyBody from '../../middlewares/body.verifier';
import validateResetEmail from '../../middlewares/validate.reset.email';
import validateResetLink from '../../middlewares/validate.reset.link';

const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

authRouter.post('/reset',
  verifyBody,
  validateInputs(true, 'resetPassword', ['email']),
  validateResetEmail,
  authController.sendRecoveryEmail);

authRouter.post('/reset/:email',
  authController.updateEmail);

authRouter.get('/reset/:token',
  validateResetLink,
  authController.verifyRecoveryLink);

export default authRouter;
