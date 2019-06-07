import express from 'express';
import dbTestRouter from './db.test';

const v2router = express();

v2router.use('/dbTest', dbTestRouter);

export default v2router;
