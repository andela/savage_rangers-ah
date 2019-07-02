import { Router } from 'express';
import articleController from '../controllers/articleController';
import checkArticleOwner from '../../middlewares/checkArticleOwnership';
import checkValidToken from '../../middlewares/checkValidToken';
import bodyVerifier from '../../middlewares/validations/body.verifier';
import checkArticle from '../../middlewares/getOneArticle';
import uploadImage from '../../middlewares/upload';
import errorHandler from '../../middlewares/errorHandler';

const articleRouter = new Router();

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
export default articleRouter;
