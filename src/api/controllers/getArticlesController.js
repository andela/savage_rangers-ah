import model from '../models/index';
import status from '../../helpers/constants/status.codes';
/**
 * @class
 */
export default class Articles {
  /**
 * register a new user
 *
 * @static
 * @param {*} req the request
 * @param {*} res the response to be sent
 * @memberof Articles
 * @returns {Object} res
 */
  static async getArticles(req, res) {
    const { Article } = model;
    const articles = await Article.findAll();
    const ZERO = 0;

    if (articles.length > ZERO) {
      res.status(status.OK).json({
        status: 200,
        articles,
      });
    } else {
      res.status(status.NOT_FOUND).json({
        status: 404,
        message: 'There are no articles at the moment, Please try again later'
      });
    }
  }

  /**
 * register a new user
 *
 * @static
 * @param {*} req the request
 * @param {*} res the response to be sent
 * @memberof Articles
 * @returns {Object} res
 */
  static async getArticle(req, res) {
    const { slug } = req.params;
    const { Article } = model;
    const article = await Article.findAll({
      where: { slug }
    });

    const ZERO = 0;
    const articleObject = article[0];
    if (article.length > ZERO) {
      res.status(status.OK).json({
        status: 200,
        article: articleObject,
      });
    } else {
      res.status(status.NOT_FOUND).json({
        status: 404,
        message: 'Not found'
      });
    }
  }
}
