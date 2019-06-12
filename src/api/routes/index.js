import express from 'express';
import dbTestRouter from './db.test';
import authRouter from './authRouter';

const router = express();

router.use('/dbTest', dbTestRouter);
router.use('/auth', authRouter);

export default router;
