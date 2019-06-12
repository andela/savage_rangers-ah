import { Router } from 'express';
import resetController from '../controllers/password.reset';
import validateInputs from '../../middlewares/validations/body.inputs';
import verifyBody from '../../middlewares/validations/body.verifier';
import validateResetEmail from '../../middlewares/validations/validate.reset.email';
import validateResetLink from '../../middlewares/validations/validate.reset.link';
import validateUpdatePassword from '../../middlewares/validations/validate.update.password';

const router = Router();

router.post(
  '/',
  verifyBody,
  validateInputs(true, 'resetPassword', ['email']),
  validateResetEmail,
  resetController.sendRecoveryEmail
);

router.post(
  '/update/:email',
  verifyBody,
  validateInputs(true, 'updatePassword', ['password']),
  validateUpdatePassword,
  resetController.updatePassword
);

router.get('/:token', validateResetLink, resetController.verifyRecoveryLink);

export default router;
