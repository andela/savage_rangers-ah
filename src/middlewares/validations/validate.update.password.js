import Joi from '@hapi/joi';
import models from '../../api/models';
import sendError from '../../helpers/error.sender';
import validationSchemas from '../../helpers/constants/validation.schemas';
import status from '../../helpers/constants/status.codes';
import errors from '../../helpers/constants/error.messages';

/**
 * A function to validate the an email provided in the url parms
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default async (req, res, next) => {
  // Initializing variables
  const userEmail = req.params.email;
  let tempUser;

  Joi.validate(userEmail, validationSchemas.email, async (err) => {
    if (!err) {
      try {
        tempUser = await models.User.findByEmail(userEmail);
        req.user = tempUser.dataValues;
        next();
      } catch (TypeError) {
        sendError(status.NOT_FOUND, res, 'email', errors.unkownEmail);
      }
    } else {
      sendError(status.BAD_REQUEST, res, 'email', errors.email);
    }
  });
};
