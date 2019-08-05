import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';
import errorMessage from '../helpers/constants/error.messages';

const { User } = models;
export default async (req, res, next) => {
  const { username } = req.body;
  const usedUsername = await User.findOne({ where: { username } });
  if (usedUsername) sendError(statusCode.BAD_REQUEST, res, 'username', errorMessage.usernameExists);
  else return next();
};
