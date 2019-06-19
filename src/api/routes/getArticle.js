import { Router } from 'express';
import Articles from '../controllers/getArticlesController';

const route = Router();

route.get('/', Articles.getArticles);
route.get('/:slug', Articles.getArticle);


export default route;
