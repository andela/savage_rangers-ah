import { Router } from 'express';
import authController from '../controllers/authController';
import adminPermissionsController from '../controllers/admin/adminPermissionsController';
import ValidateUser from '../../middlewares/ValidateUser';
import validateToken from '../../middlewares/checkValidToken';
import checkUser from '../../middlewares/checkUser';
import checkIfAdmin from '../../middlewares/IsAdmin';
import checkIfBlocked from '../../middlewares/isBlocked';
import articleController from '../controllers/articleController';
import checkIfArticleExist from '../../middlewares/getOneArticle';
import CheckIfModerator from '../../middlewares/CheckIfModerator';
import CheckIfBlocked from '../../middlewares/isArticleBlocked';
import AdminReportedComment from '../controllers/admin/commentReportController';
import CheckIfCommentBlocked from '../../middlewares/isCommentBlocked';
import checkIfCommentExist from '../../middlewares/checkIfCommentExist';

const adminRouter = new Router();

adminRouter.post('/users',
  validateToken,
  checkIfAdmin.checkAdmin,
  ValidateUser.validateSignup,
  authController.signup);

adminRouter.get('/users',
  validateToken,
  checkIfAdmin.checkAdmin,
  adminPermissionsController.getUsers);

adminRouter.patch('/users/:email',
  validateToken,
  checkIfAdmin.checkAdmin,
  checkUser.checkIfUserExist,
  adminPermissionsController.updateUser);

adminRouter.patch('/users/add/:email/moderator',
  validateToken,
  checkIfAdmin.checkAdmin,
  checkUser.checkIfUserExist,
  checkIfAdmin.checkModerator,
  adminPermissionsController.makeModerator);

adminRouter.patch('/users/remove/:email/moderator',
  validateToken,
  checkIfAdmin.checkAdmin,
  checkUser.checkIfUserExist,
  checkIfAdmin.checkNormal,
  adminPermissionsController.removeModerator);

adminRouter.patch('/users/:email/block',
  validateToken,
  checkIfAdmin.checkAdmin,
  checkUser.checkIfUserExist,
  checkIfBlocked.checkBlocked,
  adminPermissionsController.blockUser);

adminRouter.patch('/users/:email/unblock',
  validateToken,
  checkIfAdmin.checkAdmin,
  checkUser.checkIfUserExist,
  checkIfBlocked.checkUnBlocked,
  adminPermissionsController.unBlockUser);

adminRouter.get('/articles',
  validateToken,
  CheckIfModerator.CheckAdmins,
  articleController.getArticles);

adminRouter.get('/article/:slug',
  validateToken,
  CheckIfModerator.CheckAdmins,
  articleController.getArticle);

adminRouter.get('/articles/reported',
  validateToken,
  CheckIfModerator.CheckAdmins,
  adminPermissionsController.getReportedArticles);

adminRouter.get('/article/:slug/reported',
  validateToken,
  CheckIfModerator.CheckAdmins,
  adminPermissionsController.getReportedArticle);

adminRouter.patch('/article/:slug/block',
  validateToken,
  CheckIfModerator.CheckAdmins,
  checkIfArticleExist.getArticle,
  CheckIfBlocked.checkBlocked,
  adminPermissionsController.blockArticle);

adminRouter.patch('/article/:slug/unblock',
  validateToken,
  CheckIfModerator.CheckAdmins,
  checkIfArticleExist.getArticle,
  CheckIfBlocked.checkUnBlocked,
  adminPermissionsController.unBlockArticle);

adminRouter.get('/comments/reported',
  validateToken,
  CheckIfModerator.CheckAdmins,
  AdminReportedComment.getAllReportedComments);

adminRouter.get('/comments/:id/reported',
  validateToken,
  CheckIfModerator.CheckAdmins,
  AdminReportedComment.singleReportedComment);
adminRouter.patch('/comments/:id/block',
  validateToken,
  CheckIfModerator.CheckAdmins,
  checkIfCommentExist.checkIfExist,
  CheckIfCommentBlocked.checkBlockedUnblocked('unblocked'),
  AdminReportedComment.blockComment);

adminRouter.patch('/comments/:id/unblock',
  validateToken,
  CheckIfModerator.CheckAdmins,
  checkIfCommentExist.checkIfExist,
  CheckIfCommentBlocked.checkBlockedUnblocked('blocked'),
  AdminReportedComment.unBlockComment);

export default adminRouter;
