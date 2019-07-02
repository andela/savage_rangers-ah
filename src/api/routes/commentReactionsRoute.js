import { Router } from 'express';
import commentReaction from '../controllers/commentReactionsController';
import checkValidToken from '../../middlewares/checkValidToken';
import errorHandler from '../../middlewares/errorHandler';
import reactionsCheck from '../../middlewares/commentReaction';
import switchCommentReaction from '../../middlewares/switchCommentReaction';

const reactionsRouter = new Router();
reactionsRouter.post('/likes/:commentId',
  checkValidToken,
  switchCommentReaction.hasDisliked,
  reactionsCheck.liked,
  errorHandler(commentReaction.likeComment));
reactionsRouter.post('/dislikes/:commentId',
  checkValidToken,
  switchCommentReaction.hasLiked,
  reactionsCheck.disliked,
  errorHandler(commentReaction.dislikeComment));
reactionsRouter.get('/dislikes/:commentId',
  checkValidToken,
  errorHandler(commentReaction.getDislikeCount));
reactionsRouter.get('/likes/:commentId',
  checkValidToken,
  errorHandler(commentReaction.getLikeCount));
export default reactionsRouter;
