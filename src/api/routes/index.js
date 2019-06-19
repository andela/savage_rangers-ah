import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import articleRouter from './articleRouter';
import profileRouter from './profileRouter';
import authenticate from '../../middlewares/authenticate';

import articleRouter from './articleRoutes';

const router = express();

router.use('/password-reset', resetRouter);
router.use('/articles', articleRouter);
router.use('/users', authRouter);
router.use('/profiles', authenticate, profileRouter);

export default router;
