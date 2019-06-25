import express from 'express';
import articleTagController from '../controllers/articleTagController';
import authorization from '../../middlewares/authorization';
import validdateInputs from '../../middlewares/validations/body.inputs';
import checkArticle from '../../middlewares/getOneArticle';
import ownershipValidator from '../../middlewares/checkArticleOwnership';
import verifyBody from '../../middlewares/validations/body.verifier';

const router = express();

router.patch('/:slug/tags',
  authorization,
  verifyBody,
  validdateInputs(true, 'addArticleTag', ['tag']),
  checkArticle.getArticle,
  ownershipValidator.checkOwner,
  articleTagController.createArticleTag);

export default router;
