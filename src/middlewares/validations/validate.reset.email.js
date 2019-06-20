import models from '../../api/models';
import sendError from '../../helpers/error.sender';
import status from '../../helpers/constants/status.codes';
/**
 * A function to verify if the provided email exists in the database
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default async (req, res, next) => {
  // Initializing variables
  const userEmail = req.body.email;
  let tempUser;

  try {
    tempUser = await models.User.findByEmail(userEmail);
    req.user = tempUser.dataValues;
    next();
  } catch (error) {
    const message = "A user with the provided email doesn't exist";
    sendError(status.NOT_FOUND, {}, res, message);
  }
};
