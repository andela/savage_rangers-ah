import express from 'express';
import dbTestRouter from './db.test';
import authRouter from './signout';

const v2router = express();

v2router.use('/dbTest', dbTestRouter);
v2router.use('/auth', authRouter);

export default v2router;
