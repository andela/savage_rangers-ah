import { Router } from 'express';
import checkArticle from '../../middlewares/getOneArticle';
import checkValidToken from '../../middlewares/checkValidToken';
import bodyVerifier from '../../middlewares/validations/body.verifier';
import ratingsController from '../controllers/articleRatingController';
import articleController from '../controllers/articleController';
import validateInputs from '../../middlewares/validations/body.inputs';
import checkArticleOwner from '../../middlewares/checkArticleOwnership';
import checkExistingRates from '../../middlewares/checkExistingRating';
import uploadImage from '../../middlewares/upload';
import errorHandler from '../../middlewares/errorHandler';

const articleRouter = new Router();

articleRouter.post('/:slug/rating',
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  validateInputs(true, 'rateArticle', ['rating']),
  checkExistingRates.ExistingRating,
  ratingsController.rateArticle);

articleRouter.patch('/:slug',
  uploadImage.single('coverImage'),
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  checkArticleOwner.checkOwner,
  articleController.updateArticle);

articleRouter.post('/',
  checkValidToken,
  uploadImage.single('coverImage'),
  errorHandler(articleController.create));

articleRouter.delete('/:slug',
  checkValidToken,
  checkArticleOwner.checkOwner,
  articleController.delete);

export default articleRouter;
