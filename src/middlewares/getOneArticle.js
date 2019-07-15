import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { Article } = models;
/**
 * get a single article middleware
 *
 * @export
 * @class getOneArticle
 */
class getOneArticle {
  /**
   * this is a middleware which checks if the article slug is registered in to our database.
   *
   * @author Frank Mutabazi, Prémices
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @param { object } next the next route controller to be called
   * @memberof getOneArticle
   * @returns {Object} res
   */
  static async getArticle(req, res, next) {
    const { slug } = req.params;

    const result = await Article.findOne({
      where: {
        slug
      }
    });

    if (result) req.article = result.dataValues;

    return result
      ? next()
      : sendError(statusCode.NOT_FOUND,
        res,
        'slug',
        `Article with slug ${slug} is not found, Thanks`);
  }
}

export default getOneArticle;
