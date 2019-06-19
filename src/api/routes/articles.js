import { Router } from 'express';
import articleController from '../controllers/article';
import validateLike from '../../middlewares/like';

const articleRouter = new Router();

articleRouter.post('/:id/like', validateLike, articleController.like);
articleRouter.post('/:id/dislike', articleController.dislike);

export default articleRouter;
