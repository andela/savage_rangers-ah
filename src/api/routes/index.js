import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import articleRouter from './articleRouter';
import profileRouter from './profileRouter';
import authorsRouter from './authorsRoutes';


const router = express();
router.use('/password-reset', resetRouter);
router.use('/articles', articleRouter);
router.use('/users', authRouter);
router.use('/authors', authorsRouter);
router.use('/profiles', profileRouter);


export default router;
