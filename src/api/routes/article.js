import { Router } from 'express';
import articleController from '../controllers/articleController';

const articleRouter = new Router();

articleRouter.get('/search', articleController.search);

export default articleRouter;
