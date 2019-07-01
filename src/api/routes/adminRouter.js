import { Router } from 'express';
import authController from '../controllers/authController';
import adminPermissionsController from '../controllers/adminPermissionsController';
import ValidateUser from '../../middlewares/ValidateUser';
import validateToken from '../../middlewares/checkValidToken';
import checkUser from '../../middlewares/checkUser';
import checkIfAdmin from '../../middlewares/IsAdmin';
import checkIfBlocked from '../../middlewares/isBlocked';

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

export default adminRouter;
