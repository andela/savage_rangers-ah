import { Router } from 'express';
import bookmarkController from '../controllers/bookmarkController';
import authorization from '../../middlewares/checkValidToken';

const route = new Router();

route.post('/:slug', authorization, bookmarkController.addBookmark);
route.get('/', authorization, bookmarkController.getBookmarks);


export default route;
