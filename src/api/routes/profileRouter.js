import { Router } from 'express';
import profileController from '../controllers/profileController';
import upload from '../../middlewares/upload';
import validateInputs from '../../middlewares/validations/body.inputs';

const profileRouter = new Router();
const fields = [
  'country',
  'lastName',
  'firstName',
  'address',
  'gender',
  'phoneNumber',
  'bio',
  'profileImage',
  'facebook',
  'twitter'
];

profileRouter.patch('/',
  upload.single('profileImage'),
  validateInputs('profile', fields),
  profileController.update);
profileRouter.get('/:username', profileController.read);

export default profileRouter;
