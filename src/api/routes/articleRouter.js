import express from 'express';
import articleController from '../controllers/articleController';
import authorization from '../../middlewares/authorization';

const router = express();

router.get('/:slug/ratings', authorization, articleController.createArticleRating);

export default router;
