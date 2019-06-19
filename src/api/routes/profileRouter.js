import { Router } from 'express';
import profileController from '../controllers/profileController';
import ValidateProfile from '../../middlewares/ValidateProfile';
import upload from '../../middlewares/upload';

const profileRouter = Router();

profileRouter.post('/', upload.single('avatar'), ValidateProfile.validate, profileController.create);
profileRouter.patch('/', upload.single('avatar'), profileController.update);
profileRouter.get('/', profileController.getUserProfile);
profileRouter.get('/:username', profileController.read);

export default profileRouter;
