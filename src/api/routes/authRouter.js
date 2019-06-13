import { Router } from 'express';
import authController from '../controllers/authController';
import EmailVerifier from '../controllers/verifyEmail';
import validateInputs from '../../middlewares/validations/body.inputs';
import verifyBody from '../../middlewares/body.verifier';
import validateResetEmail from '../../middlewares/validations/validate.reset.email';
import validateResetLink from '../../middlewares/validations/validate.reset.link';


const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/verifyEmail/:token', EmailVerifier.verifyEmail);


authRouter.post('/reset',
  verifyBody,
  validateInputs(true, 'resetPassword', ['email']),
  validateResetEmail,
  authController.sendRecoveryEmail);

authRouter.post('/reset/update/:email',
  verifyBody,
  validateInputs(true, 'updatePassword', ['password']),
  authController.updatePassword);

authRouter.get('/reset/:token',
  validateResetLink,
  authController.verifyRecoveryLink);

export default authRouter;
