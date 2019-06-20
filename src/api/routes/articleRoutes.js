import { Router } from 'express';
import deleteArticleController from '../controllers/deleteArticleController';
import tokenVerifier from '../../middlewares/tokenVerifier';

const articleRouter = new Router();

articleRouter.delete('/:slug', tokenVerifier, deleteArticleController.delete);

export default articleRouter;
