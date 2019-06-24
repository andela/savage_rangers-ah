import models from '../models';
import status from '../../helpers/constants/status.codes';

const { Article } = models;
/**
 *
 *
 * @export
 * @class deleteArticle
 */
export default class deleteArticle {
  /**
   *
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - respond object
   * @returns {Object} response body
   * @memberof deleteArticle
   */
  static async delete(req, res) {
    const { slug } = req.params;
    await Article.destroy({ where: { slug } });
    res.status(status.OK).json({
      status: res.statusCode,
      message: 'article deleted successfully'
    });
  }
}
