import express from 'express';
<<<<<<< HEAD
import dbTestRouter from './db.test';
=======
>>>>>>> [Ft #166240818] send a valid token to the user
import authRouter from './authRouter';

const router = express();

<<<<<<< HEAD
router.use('/dbTest', dbTestRouter);
=======
>>>>>>> [Ft #166240818] send a valid token to the user
router.use('/auth', authRouter);

export default router;
