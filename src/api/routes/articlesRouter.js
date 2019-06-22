import { Router } from 'express';
import Articles from '../controllers/articlesController';

const route = new Router();

route.get('/', Articles.getArticles);
route.get('/:slug', Articles.getArticle);


export default route;
