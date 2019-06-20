import { Router } from 'express';
import checkAuth from '../../middlewares/checkAuth';
import ArticleController from '../controllers/articleController';
import errorHandler from '../../middlewares/errorHandler';
import uploadImage from '../../middlewares/upload';

const articleRouter = new Router();

articleRouter
  .route('/articles')
  .post(checkAuth, uploadImage.single('image'), errorHandler(ArticleController.create));

export default articleRouter;
