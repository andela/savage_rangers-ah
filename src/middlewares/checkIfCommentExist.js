import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { Comment } = models;
/**
 * check Comment middleware
 *
 * @export
 * @class checkIfCommentExist
 */
class checkIfCommentExist {
  /**
   * this is a middleware which checks if comment exist.
   *
   * @author R
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @param { object } next A callback to allow the node process to continue
   * @memberof checkIfCommentExist
   * @returns {Object} res
   */
  static async checkIfExist(req, res, next) {
    const { id } = req.params;
    const result = await Comment.findOne({
      where: {
        id
      }
    });
    if (result) req.article = result.dataValues;

    return result
      ? next()
      : sendError(statusCode.NOT_FOUND, res, 'id', `Comment with id ${id} is not found, Thanks`);
  }
}

export default checkIfCommentExist;
