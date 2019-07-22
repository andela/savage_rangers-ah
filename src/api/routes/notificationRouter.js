import { Router } from 'express';
import notificationController from '../controllers/notificationController';
import checkValidToken from '../../middlewares/checkValidToken';
import validateInputs from '../../middlewares/validations/body.inputs';
import bodyVerifier from '../../middlewares/validations/body.verifier';
import checkUpdateNotification from '../../middlewares/check.update.notification';

const router = new Router();

router.patch('/configuration',
  checkValidToken,
  bodyVerifier,
  validateInputs('notificationConfig', ['inApp']),
  notificationController.updateConfig);

router.get('/configuration', checkValidToken, notificationController.getConfig);

router.get('/', checkValidToken, notificationController.getAll);
router.get('/seen', checkValidToken, notificationController.getSeenUnseen);
router.get('/unseen', checkValidToken, notificationController.getSeenUnseen);

router.patch('/:id/seen',
  checkValidToken,
  checkUpdateNotification,
  notificationController.updateNotification);

router.patch('/:id/unseen',
  checkValidToken,
  checkUpdateNotification,
  notificationController.updateNotification);

router.get('/configuration/unsubscribe/email',
  checkValidToken,
  notificationController.updateConfig);

export default router;
