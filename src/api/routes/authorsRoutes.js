import { Router } from 'express';
import getAuthorsController from '../controllers/deleteArticleController';

const authorsRouter = new Router();

authorsRouter.get('/', getAuthorsController.authors);

export default authorsRouter;
