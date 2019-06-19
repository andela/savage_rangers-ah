import model from '../models/index';
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
    if (articles.length > 0) {
      res.status(200).json({
        status: 200,
        articles,
      });
    } else {
      res.status(404).json({
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
    const articleObject = article[0];
    if (article.length > 0) {
      res.status(200).json({
        status: 200,
        article: articleObject,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Not found'
      });
    }
  }
}
