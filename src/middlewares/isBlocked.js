import models from '../api/models';
import status from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { User } = models;
/**
 * check if user is blocked
 *
 * @export
 * @class checkIfBlocked
 */
class isBlocked {
  /**
   * this is a middleware which checks if a user is blocked.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkUser
   * @returns {Object} res
   */
  static async checkBlocked(req, res, next) {
    const { email } = req.params;

    const result = await User.findOne({
      where: {
        email,
        isBlocked: false
      }
    });

    if (result) {
      req.username = result.dataValues.username;
      return next();
    }
    sendError(status.BAD_REQUEST, res, 'isBlocked', `${email} is already blocked`);
  }

  /**
   * this is a middleware which checks if a user is not blocked.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkUser
   * @returns {Object} res
   */
  static async checkUnBlocked(req, res, next) {
    const { email } = req.params;

    const result = await User.findOne({
      where: {
        email,
        isBlocked: true
      }
    });

    if (result) {
      req.username = result.dataValues.username;
      return next();
    }
    sendError(status.BAD_REQUEST, res, 'isBlocked', `${email} is not blocked`);
  }
}

export default isBlocked;
