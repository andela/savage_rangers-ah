import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import articleRouter from './articles';
import authenticate from '../../middlewares/authenticate';


const router = express();

router.use('/users', authRouter);
router.use('/password-reset', resetRouter);
router.use('/articles', authenticate, articleRouter);

export default router;
