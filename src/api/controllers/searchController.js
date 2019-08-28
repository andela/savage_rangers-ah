import Sequelize from 'sequelize';
import models from '../models/index';
import statusCodes from '../../helpers/constants/status.codes';
import errorMessage from '../../helpers/constants/error.messages';
import searchArticle from '../../helpers/commonAction/searchArticles';
import generatePagination from '../../helpers/generate.pagination.details';

const { OK, NOT_FOUND } = statusCodes;

/**
 * @class searchController
 */
export default class searchController {
  /**
   *
   * search for artcile according to user's request
   *
   * @static
   * @param {*} req the request
   * @param {*} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async search(req, res) {
    try {
      const articles = await searchArticle(Sequelize, req, models);
      const minArticleLength = 0;
      const defaultLimit = 10;
      if (articles.count > minArticleLength) {
        const { limit, offset } = req.query;
        return res.status(OK).send({
          status: res.statusCode,
          paginationDetails: generatePagination(articles.count,
            articles.rows,
            offset || minArticleLength,
            limit || defaultLimit),
          articles
        });
      }
      res.status(NOT_FOUND).send({
        status: res.statusCode,
        message: errorMessage.noResult
      });
    } catch (error) {
      return res.status(OK).send({
        error
      });
    }
  }
}
