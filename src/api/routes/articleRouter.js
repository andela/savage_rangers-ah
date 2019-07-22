import { Router } from 'express';
import checkArticle from '../../middlewares/getOneArticle';
import articleController from '../controllers/articleController';
import articleTagController from '../controllers/articleTagController';
import checkArticleOwner from '../../middlewares/checkArticleOwnership';
import checkValidToken from '../../middlewares/checkValidToken';
import bodyVerifier from '../../middlewares/validations/body.verifier';
import ratingsController from '../controllers/articleRatingController';
import validateInputs from '../../middlewares/validations/body.inputs';
import checkExistingRates from '../../middlewares/checkExistingRating';
import uploadImage from '../../middlewares/upload';
import errorHandler from '../../middlewares/errorHandler';
import shareArticle from '../../middlewares/shareArticle';
import validateRatingsRoute from '../../middlewares/validations/ratings.routes';
import commentController from '../controllers/commentController';
import validateGetCommentRoute from '../../middlewares/validations/get.comments.route';
import getComment from '../../middlewares/get.comment.record';
import validateCommentUpdateDelete from '../../middlewares/validations/comment.update.delete';
import checkCommentOwner from '../../middlewares/check.comment.ownership';
import checkIncomingTags from '../../middlewares/check.incoming.tags';
import createAndGetNewTags from '../../middlewares/get.new.tags';
import validateTagsTableQueryRoute from '../../middlewares/validations/query.tags.table.route';
import optionalAuth from '../../middlewares/optionalAuth';
import reportCommentController from '../controllers/reportCommentController';

const articleRouter = new Router();

articleRouter.get('/search/', articleController.search);
articleRouter.get('/:slug/stats', checkArticle.getArticle, optionalAuth, articleController.stats);
articleRouter.get('/drafts', checkValidToken, articleController.getDraftedArticles);

articleRouter.post('/:slug/rating',
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  validateInputs('rateArticle', ['rating']),
  checkExistingRates.ExistingRating,
  ratingsController.rateArticle);
const highlightFields = ['firstIndex', 'lastIndex', 'comment', 'text'];

articleRouter.get('/', articleController.getArticles);
articleRouter.get('/:slug', optionalAuth, articleController.getArticle);
articleRouter.patch('/:slug',
  uploadImage.single('coverImage'),
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  validateInputs('updateArticle', ['title', 'description', 'body', 'category', 'tags']),
  checkArticle.getArticle,
  checkArticleOwner.checkOwner,
  checkIncomingTags,
  createAndGetNewTags,
  articleController.updateArticle);

articleRouter.post('/',
  checkValidToken,
  uploadImage.single('coverImage'),
  bodyVerifier,
  checkIncomingTags,
  createAndGetNewTags,
  errorHandler(articleController.create));

articleRouter.get('/:slug/ratings/statistics',
  checkValidToken,
  ratingsController.getArticleRatingStatistics);

articleRouter.get('/:slug/:rating/users',
  checkValidToken,
  validateRatingsRoute,
  ratingsController.getRatingUsers);

articleRouter.delete('/:slug',
  checkValidToken,
  checkArticle.getArticle,
  checkArticleOwner.checkOwner,
  articleController.delete);

articleRouter.post('/:slug/highlight',
  checkValidToken,
  checkArticle.getArticle,
  validateInputs('highlight', highlightFields),
  articleController.highlight);

articleRouter.get('/:slug/highlight', checkArticle.getArticle, articleController.getHighlight);

articleRouter.post('/:slug/report',
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  validateInputs('reportArticle', ['reason']),
  checkArticleOwner.checkOwner,
  articleController.reportAnArticle);
articleRouter.get('/category/:categoryId', articleController.getArticlesByCategory);

articleRouter.get('/:slug/tags',
  checkValidToken,
  checkArticle.getArticle,
  articleTagController.getArticleTags);

articleRouter.get('/tags/query',
  checkValidToken,
  validateTagsTableQueryRoute,
  articleTagController.getTagsByQuery);

articleRouter.post('/:slug/share/facebook',
  checkValidToken,
  checkArticle.getArticle,
  shareArticle,
  articleController.socialShareArticle);

articleRouter.post('/:slug/share/twitter',
  checkValidToken,
  checkArticle.getArticle,
  shareArticle,
  articleController.socialShareArticle);

articleRouter.post('/:slug/share/linkedin',
  checkValidToken,
  checkArticle.getArticle,
  shareArticle,
  articleController.socialShareArticle);

articleRouter.post('/:slug/share/gmail',
  checkValidToken,
  checkArticle.getArticle,
  shareArticle,
  articleController.socialShareArticle);

articleRouter.post('/:slug/comments',
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  validateInputs('postComment', ['body', 'parentCommentId']),
  commentController.create);

articleRouter.get('/:slug/comments',
  checkValidToken,
  validateGetCommentRoute,
  checkArticle.getArticle,
  commentController.getComments);

articleRouter.patch('/:slug/comments/:id',
  checkValidToken,
  validateCommentUpdateDelete,
  bodyVerifier,
  validateInputs('updateComment', ['body']),
  getComment,
  checkCommentOwner,
  commentController.updateComment);

articleRouter.delete('/:slug/comments/:id',
  checkValidToken,
  validateCommentUpdateDelete,
  getComment,
  checkCommentOwner,
  commentController.deleteComment);

articleRouter.get('/:slug/comments/:id',
  checkValidToken,
  validateCommentUpdateDelete,
  commentController.getSingleComment);

articleRouter.patch('/:slug/publish',
  checkValidToken,
  checkArticleOwner.checkOwner,
  articleController.publish);

articleRouter.post('/:slug/comments/:id/report',
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  getComment,
  validateInputs('reportComment', ['commentReason']),
  reportCommentController.reportComment);

export default articleRouter;
