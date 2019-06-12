import models from '../api/models';
import sendError from '../helpers/error.sender';

export default async (req, res, next) => {
  // Initializing variables
  const userEmail = req.body.email;
  let tempUser;

  try {
    tempUser = await models.Users.findAll({
      where: {
        email: userEmail,
      },
    });
    req.user = tempUser.dataValues;
    next();
  } catch (error) {
    if (tempUser.length === 0) {
      const mess = 'A user with the provided email doesn\'t exit';
      sendError(404, {}, res, mess);
    } else sendError(400, {}, res, error);
  }
};
