import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import articleRouter from './articleRouter';

const router = express();

router.use('/users', authRouter);
router.use('/password-reset', resetRouter);
router.use('/articles', articleRouter);

export default router;
