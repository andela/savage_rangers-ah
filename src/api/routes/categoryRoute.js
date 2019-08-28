import { Router } from 'express';
import categoryController from '../controllers/categoryController';

const categoryRouter = new Router();

categoryRouter.get('/', categoryController.getCategory);

export default categoryRouter;
