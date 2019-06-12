import { Router } from 'express';
import ValidateUser from '../../middlewares/ValidateUser';
import authController from '../controllers/authController';
import socialAuthController from '../controllers/socialAuth';
import env from '../../configs/environments';
import social from '../../middlewares/social/social';

const authRouter = new Router();

authRouter.post('/signup', ValidateUser.validateSignup, authController.signup);
authRouter.post('/login', authController.login);

authRouter.post('/mockFacebook', social, socialAuthController.facebookAuth);
authRouter.post('/mockGoogle', social, socialAuthController.googleAuth);
authRouter.post('/mockTwitter', social, socialAuthController.twitterAuth);

authRouter.get('/facebook', env.passport.authenticate('facebook'));
authRouter.get('/facebook/callback',
  env.passport.authenticate('facebook'),
  socialAuthController.facebookAuth);

authRouter.get('/google', env.passport.authenticate('google', { scope: ['email', 'profile'] }));
authRouter.get('/google/callback',
  env.passport.authenticate('google'),
  socialAuthController.googleAuth);

authRouter.get('/twitter', env.passport.authenticate('twitter', { scope: ['email', 'profile'] }));
authRouter.get('/twitter/callback',
  env.passport.authenticate('twitter'),
  socialAuthController.twitterAuth);

export default authRouter;
