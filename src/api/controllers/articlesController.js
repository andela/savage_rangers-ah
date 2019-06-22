import model from '../models/index';
import status from '../../helpers/constants/status.codes';
import errorMessage from '../../helpers/constants/error.messages';
import errorSender from '../../helpers/error.sender';
/**
 * @class
 */
export default class Articles {
  /**
   * This function gets all the articles that are stored in the article table
   *
   * @static
   * @param {*} req the request
   * @param {*} res the response to be sent
   * @memberof Articles
   * @returns {Object} res
   */
  static async getArticles(req, res) {
    const { Article } = model;
    const { page } = req.query;
    const articles = await Article.findAndCountAll();
    const limit = 10;
    let offset = 0;
    const pages = Math.ceil(articles.count / limit);
    offset = limit * (page - 1);
    const currentPage = Math.floor(offset / limit) + 1;

    const pagedArticles = await Article.findAll({
      limit,
      offset
    });
    res.status(status.OK).json({
      Page: pages,
      Count: articles.count,
      currentPage,
      Articles: pagedArticles
    });
  }

  /**
   * This function gets a specific article using slug as the search keyword
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
    const noArticles = 0;
    const articleObject = article[0];
    if (article.length > noArticles) {
      res.status(status.OK).json({
        status: 200,
        article: articleObject
      });
    } else {
      errorSender(status.NOT_FOUND, res, 'Article', errorMessage.noArticles);
    }
  }
}
