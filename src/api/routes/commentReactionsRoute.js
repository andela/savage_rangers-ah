import { Router } from 'express';
import commentReaction from '../controllers/commentReactionsController';
import checkValidToken from '../../middlewares/checkValidToken';
import errorHandler from '../../middlewares/errorHandler';
import reactionsCheck from '../../middlewares/commentReaction';

const reactionsRouter = new Router();
reactionsRouter.post('/likes/:commentId',
  checkValidToken,
  reactionsCheck.liked,
  errorHandler(commentReaction.likeComment));
reactionsRouter.post('/dislikes/:commentId',
  checkValidToken,
  reactionsCheck.disliked,
  errorHandler(commentReaction.dislikeComment));
reactionsRouter.get('/dislikes/:commentId',
  checkValidToken,
  errorHandler(commentReaction.getDislikeCount));
reactionsRouter.get('/likes/:commentId',
  checkValidToken,
  errorHandler(commentReaction.getLikeCount));
export default reactionsRouter;
