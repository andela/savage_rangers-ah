import Joi from '@hapi/joi';
import models from '../../api/models';
import sendError from '../../helpers/error.sender';
import validationSchemas from '../../helpers/validation.schemas';

export default async (req, res, next) => {
  // Initializing variables
  const userEmail = req.params.email;
  let tempUser;

  Joi.validate(userEmail, validationSchemas.email, async (err) => {
    if (!err) {
      try {
        tempUser = await models.User.findAll({
          where: {
            email: userEmail,
          },
        });
        req.user = tempUser[0].dataValues;
        next();
      } catch (TypeError) {
        const mess = 'A user with the provided email doesn\'t exit';
        sendError(404, {}, res, mess);
      }
    } else {
      const error = 'Invalid email provided';
      sendError(400, {}, res, error);
    }
  });
};
