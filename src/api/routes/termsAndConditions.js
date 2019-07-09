import { Router } from 'express';
import checkValidToken from '../../middlewares/checkValidToken';
import termsAndConditions from '../controllers/termsAndConditionsController';
import errorHandler from '../../middlewares/errorHandler';
import isAdmin from '../../middlewares/IsAdmin';

const termsAndConditionsRouter = new Router();

termsAndConditionsRouter.get('/:id', errorHandler(termsAndConditions.getTermsAndConditions));
termsAndConditionsRouter.put('/:id',
  checkValidToken,
  isAdmin.checkAdmin,
  errorHandler(termsAndConditions.updateTermsAndConditions));

export default termsAndConditionsRouter;
