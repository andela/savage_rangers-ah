import { Router } from 'express';
import bookmarkController from '../controllers/bookmarkController';
import authorization from '../../middlewares/checkValidToken';

const route = new Router();

route.post('/:slug', authorization, bookmarkController.addBookmark);
route.get('/:username', authorization, bookmarkController.getBookmarks);
route.get('/bookmarked/:slug', authorization, bookmarkController.hasBookmarked);


export default route;
