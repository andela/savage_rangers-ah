import models from '../api/models';
import status from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { User } = models;
/**
 * check if user is admin
 *
 * @export
 * @class checkIfAdmin
 */
class checkIfAdmin {
  /**
   * this is a middleware which checks if the user is admin.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkUser
   * @returns {Object} res
   */
  static async checkAdmin(req, res, next) {
    const {
      user: { email }
    } = req.user;
    const result = await User.findOne({
      where: {
        email,
        role: 'admin'
      }
    });


    if (result) {
      req.username = result.dataValues.username;
      return next();
    }
    sendError(status.BAD_REQUEST, res, 'role', 'you must be an admin to perform this operation');
  }

  /**
   * this is a middleware which checks if a user is moderator.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkUser
   * @returns {Object} res
   */
  static async checkModerator(req, res, next) {
    const { email } = req.params;
    const result = await User.findOne({
      where: {
        email,
        role: 'moderator'
      }
    });
    if (!result) {
      return next();
    }
    return sendError(status.BAD_REQUEST, res, 'role', `${email} is already a moderator`);
  }

  /**
   * this is a middleware which checks if a user is a normal user.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkUser
   * @returns {Object} res
   */
  static async checkNormal(req, res, next) {
    const { email } = req.params;
    const result = await User.findOne({
      where: {
        email,
        role: 'normal'
      }
    });
    if (!result) {
      return next();
    }
    sendError(status.BAD_REQUEST, res, 'role', `${email} is not a moderator`);
  }
}

export default checkIfAdmin;
