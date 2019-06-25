import { Router } from 'express';
import getAuthorsController from '../controllers/getAuthorsController';
import checkValidToken from '../../middlewares/checkValidToken';

const authorsRouter = new Router();

authorsRouter.get('/', checkValidToken, getAuthorsController.getAuthor);

export default authorsRouter;
