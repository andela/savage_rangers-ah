import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import articleRouter from './articleRouter';
import profileRouter from './profileRouter';
import authenticate from '../../middlewares/authenticate';
import authorsRouter from './authorsRoutes';

const router = express();
router.use('/password-reset', resetRouter);
router.use('/articles', articleRouter);
router.use('/users', authRouter);
router.use('/profiles', authenticate, profileRouter);
router.use('/authors', authorsRouter);
export default router;
