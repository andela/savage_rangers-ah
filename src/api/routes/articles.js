import { Router } from 'express';
import articleController from '../controllers/article';

const articleRouter = new Router();

articleRouter.post('/:id/like', articleController.like);
articleRouter.post('/:id/dislike', articleController.dislike);

export default articleRouter;
