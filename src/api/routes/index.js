import express from 'express';
import authRouter from './authRouter';
import articleRouter from './articles';

const router = express();

router.use('/auth', authRouter);
router.use('/artcle', articleRouter);

export default router;
