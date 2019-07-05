import { Router } from 'express';
import authorsController from '../controllers/authorsController';
import checkValidToken from '../../middlewares/checkValidToken';

const authorsRouter = new Router();

authorsRouter.get('/', checkValidToken, authorsController.getAuthors);

export default authorsRouter;
