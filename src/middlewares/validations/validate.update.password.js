import Joi from '@hapi/joi';
import models from '../../api/models';
import sendError from '../../helpers/error.sender';
import validationSchemas from '../../helpers/constants/validation.schemas';

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
        tempUser = await models.User.findOne({
          where: {
            email: userEmail
          }
        });
        req.user = tempUser.dataValues;
        next();
      } catch (TypeError) {
        const message = "A user with the provided email doesn't exist";
        sendError(404, {}, res, message);
      }
    } else {
      const error = 'Invalid email provided';
      sendError(400, {}, res, error);
    }
  });
};
