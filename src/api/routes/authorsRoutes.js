import { Router } from 'express';
import getAuthorsController from '../controllers/getAuthorsController';

const authorsRouter = new Router();

authorsRouter.get('/', getAuthorsController.authors);

export default authorsRouter;
