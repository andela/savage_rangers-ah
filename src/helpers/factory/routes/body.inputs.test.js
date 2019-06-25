import express from 'express';
import validdateInputs from '../../../middlewares/validations/body.inputs';

const router = express();

router.patch('/bodyInputsValidator', validdateInputs(false, 'addArticleTag', ['tag']));

export default router;
