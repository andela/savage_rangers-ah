import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';

const router = express();

router.use('/users', authRouter);
router.use('/password-reset', resetRouter);

export default router;
