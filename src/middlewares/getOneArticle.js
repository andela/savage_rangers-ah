import models from '../api/models';
import checkExistence from '../helpers/commonAction/checkExistence';

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
    checkExistence(req, res, next, Article, 'Article');
  }
}

export default getOneArticle;
