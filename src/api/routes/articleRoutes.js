import { Router } from 'express';
import deleteArticleController from '../controllers/deleteArticleController';

const articleRouter = new Router();

articleRouter.delete('/:slug', deleteArticleController.delete);

export default articleRouter;
