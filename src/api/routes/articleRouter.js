import { Router } from 'express';
import articleController from '../controllers/articleController';
import checkArticleOwner from '../../middlewares/checkArticleOwnership';
import checkValidToken from '../../middlewares/checkValidToken';
import bodyVerifier from '../../middlewares/validations/body.verifier';
import checkArticle from '../../middlewares/getOneArticle';

const articleRouter = new Router();

articleRouter.put('/:slug',
  checkValidToken,
  bodyVerifier,
  checkArticle.getArticle,
  checkArticleOwner.checkOwner,
  articleController.articleUpdate);

export default articleRouter;
