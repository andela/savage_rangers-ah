import models from '../../api/models';
import sendError from '../../helpers/error.sender';

export default async (req, res, next) => {
  // Initializing variables
  const userEmail = req.body.email;
  let tempUser;

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
};
