import models from '../api/models';
import status from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { Article } = models;
/**
 * check if Article is blocked
 *
 * @export
 * @class checkIfBlocked
 */
class checkIfBlocked {
  /**
   * this is a middleware which checks if a Article is blocked.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkArticle
   * @returns {Object} res
   */
  static async checkBlocked(req, res, next) {
    const { slug } = req.params;

    const result = await Article.findOne({
      where: {
        slug,
        isBlocked: false
      }
    });

    if (result) {
      req.title = result.dataValues.title;
      req.body = result.dataValues.body;
      return next();
    }
    sendError(status.BAD_REQUEST, res, 'isBlocked', `${slug} is already blocked`);
  }

  /**
   * this is a middleware which checks if a Article is not blocked.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkArticle
   * @returns {Object} res
   */
  static async checkUnBlocked(req, res, next) {
    const { slug } = req.params;

    const result = await Article.findOne({
      where: {
        slug,
        isBlocked: true
      }
    });

    if (result) {
      req.title = result.dataValues.title;
      req.body = result.dataValues.body;
      return next();
    }
    sendError(status.BAD_REQUEST, res, 'isBlocked', `${slug} is not blocked`);
  }
}

export default checkIfBlocked;
