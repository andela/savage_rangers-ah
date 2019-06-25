import express from 'express';
import authRouter from './authRouter';
import resetRouter from './password.reset';
import articleRouter from './articleRouter';
import testsRouter from '../../helpers/factory/routes/body.inputs.test';

const router = express();

router.use('/users', authRouter);
router.use('/password-reset', resetRouter);
router.use('/articles', articleRouter);
router.use('/tests', testsRouter);

export default router;
