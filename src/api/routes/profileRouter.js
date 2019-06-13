import { Router } from 'express';
import profileController from '../controllers/profileController';
import ValidateProfile from '../../middlewares/ValidateProfile';

const profileRouter = Router();

profileRouter.post('/', ValidateProfile.validate, profileController.create);
profileRouter.patch('/', profileController.update);
profileRouter.get('/', profileController.getUserProfile);
profileRouter.get('/:username', profileController.read);

export default profileRouter;
