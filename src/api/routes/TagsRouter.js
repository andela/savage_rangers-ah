import { Router } from 'express';
import articleTagController from '../controllers/articleTagController';

const tagRouter = new Router();

tagRouter.get('/', articleTagController.getAllTags);

export default tagRouter;
