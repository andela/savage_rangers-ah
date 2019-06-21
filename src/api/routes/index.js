import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import article from './getArticle';

const router = express();

router.use('/auth', authRouter);
router.use('/reset', resetRouter);
router.use('/articles', article);
router.use('/users', authRouter);
router.use('/password-reset', resetRouter);

export default router;
