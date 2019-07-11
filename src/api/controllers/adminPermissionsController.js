import models from '../models';
import status from '../../helpers/constants/status.codes';
import paginateUser from '../../helpers/generate.pagination.details';

const { User } = models;
/**
 * containing all user's model controllers (signup, login)
 *
 * @export
 * @class Auth
 */
export default class adminPermissions {
  /**
   * This function gets all the users that are stored in the User table
   *
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof users
   * @returns {Object} res
   */
  static async getUsers(req, res) {
    // default constants
    const defaultLimit = 10;
    const defaultOffset = 0;
    const result = {};
    const emptyUserArray = 0;

    const limit = req.query.limit || defaultLimit;
    const offset = req.query.offset || defaultOffset;
    const users = await User.findAndCountAll({
      offset,
      limit
    });

    result.status = status.OK;
    result.pagedUsers = paginateUser(users.count, users.rows, offset, limit);
    result.users = users.rows;
    if (users.rows.length > emptyUserArray) {
      res.status(status.OK).json({
        status: status.OK,
        result
      });
    } else {
      res.status(status.NOT_FOUND).json({
        status: status.NOT_FOUND,
        message: 'There are no more users at the moment.'
      });
    }
  }

  /**
   * Update User
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async updateUser(req, res) {
    const { email } = req.params;
    const { firstName, lastName } = req.body;

    const result = await User.update({
      email,
      firstName,
      lastName
    },
    {
      where: {
        email
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: 'user updated successufully',
      data: {
        firstName,
        lastName,
        email
      }
    });
  }

  /**
   * make User a moderator
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async makeModerator(req, res) {
    const { email } = req.params;
    const role = 'moderator';
    const { username } = req;
    await User.update({
      role
    },
    {
      where: {
        email
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: `${email} is now a moderator`,
      data: {
        username,
        email
      }
    });
  }

  /**
   * remove  User from moderator role
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async removeModerator(req, res) {
    const { email } = req.params;
    const { username } = req;
    const role = 'normal';
    await User.update({
      role
    },
    {
      where: {
        email
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: `${email} is no longer a moderator`,
      data: {
        username,
        email
      }
    });
  }

  /**
   * block a user
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async blockUser(req, res) {
    const { email } = req.params;
    const isBlocked = true;
    const { username } = req;
    await User.update({
      email,
      isBlocked
    },
    {
      where: {
        email
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: `${email} blocked successfully`,
      data: {
        username,
        email
      }
    });
  }

  /**
   * unblock User
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async unBlockUser(req, res) {
    const { email } = req.params;
    const isBlocked = 'false';
    const { username } = req;
    await User.update({
      isBlocked
    },
    {
      where: {
        email
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: `${email} unblocked successfully`,
      data: {
        username,
        email
      }
    });
  }
}
