import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';

const router = express();

router.use('/auth', authRouter);
router.use('/reset', resetRouter);

export default router;
