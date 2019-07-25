import models from '../api/models';
import checkedBlockedStatus from '../helpers/commonAction/checkBlockedStatus';

const { User } = models;
/**
 * @description this middleware checks the block status of the User.
 * @export
 * @class checkIfBlocked
 */
export default class isBlocked {
  /**
   * @description This function checks if a user is blocked.
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkUser
   * @returns {Object} res
   */
  static async checkBlocked(req, res, next) {
    checkedBlockedStatus(req, res, next, false, User);
  }

  /**
   * @description This functionchecks if a user is not blocked.
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkUser
   * @returns {Object} res
   */
  static async checkUnBlocked(req, res, next) {
    checkedBlockedStatus(req, res, next, true, User);
  }
}
