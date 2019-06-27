import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';

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
   * @author Frank Mutabazi
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
        slug,
      }
    });

    return result ? next() : res.status(statusCode.NOT_FOUND).json({ message: `Article with this ${slug} is not found, Thanks` });
  }
}

export default getOneArticle;
