import { Router } from 'express';
import profileController from '../controllers/profileController';
import ValidateProfile from '../../middlewares/ValidateProfile';
import upload from '../../middlewares/upload';

const profileRouter = new Router();

profileRouter.patch('/', upload.single('profileImage'), ValidateProfile.validate,
  profileController.update);

profileRouter.get('/', profileController.getUserProfile);
profileRouter.get('/:username', profileController.read);

export default profileRouter;
