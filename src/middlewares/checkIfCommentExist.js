import models from '../api/models';

import checkexistance from '../helpers/commonAction/checkExistence';

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
    checkexistance(req, res, next, Comment, 'Comment');
  }
}

export default checkIfCommentExist;
