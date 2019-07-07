import Sequelize from 'sequelize';
import models from '../api/models';
import status from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { User } = models;
/**
 * check if user is admin
 *
 * @export
 * @class CheckIfAdmin
 */
class CheckIfAdmin {
  /**
   * this is a middleware which checks if the user is admin.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof CheckUser
   * @returns {Object} res
   */
  static async CheckAdmins(req, res, next) {
    const {
      user: { email }
    } = req.user;
    const user = await User.findOne({
      where: {
        email,
        role: {
          [Sequelize.Op.or]: ['moderator', 'admin']
        }
      }
    });
    if (user) {
      return next();
    }
    sendError(status.ACCESS_DENIED,
      res,
      'role',
      'you must be a Moderator or an Admin to perform this operation');
  }
}

export default CheckIfAdmin;
