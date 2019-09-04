import { Router } from 'express';
import profileController from '../controllers/profileController';
import upload from '../../middlewares/upload';
import validateInputs from '../../middlewares/validations/body.inputs';
import authenticate from '../../middlewares/authenticate';
import followController from '../controllers/followingController';
import authorization from '../../middlewares/checkValidToken';

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
// follow and following related routes
profileRouter.post('/:username/follow', authorization, followController.follow);
profileRouter.delete('/:username/unfollow', authorization, followController.unfollow);
profileRouter.get('/follower', authorization, followController.getUserfollower);
profileRouter.get('/following', authorization, followController.getUserfollowing);

profileRouter.patch('/',
  authenticate,
  upload.single('profileImage'),
  validateInputs('profile', fields),
  profileController.update);
profileRouter.get('/:username', authenticate, profileController.read);
profileRouter.get('/', authenticate, profileController.get);

export default profileRouter;
