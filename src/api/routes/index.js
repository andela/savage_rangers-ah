import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import profileRouter from './profileRouter';
import authenticate from '../../middlewares/authenticate';


const router = express();

router.use('/password-reset', resetRouter);
router.use('/users', authRouter);
router.use('/auth/profile', authenticate, profileRouter);

export default router;
