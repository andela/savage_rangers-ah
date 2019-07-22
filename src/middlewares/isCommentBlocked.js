import models from '../api/models';
import status from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { Comment } = models;
/**
 * check if Comment is blocked
 *
 * @export
 * @class checkIfBlocked
 */
class checkIfBlocked {
  /**
   * this is a middleware which checks if a Comment is blocked.
   *
   * @static
   * @param {String} operation
   * @memberof checkComment
   * @returns {Object} res
   */
  static checkBlockedUnblocked(operation) {
    return async (req, res, next) => {
      const isBlocked = operation === 'blocked';
      const messageString = isBlocked ? 'unblocked' : 'blocked';
      const { id } = req.params;

      const result = await Comment.findOne({
        where: {
          id,
          isBlocked
        }
      });

      if (result) {
        req.body = result.dataValues.body;
        return next();
      }
      sendError(status.BAD_REQUEST, res, 'isBlocked', `${id} is already ${messageString}`);
    };
  }
}

export default checkIfBlocked;
