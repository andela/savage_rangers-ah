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
    const checkArticle = await Article.findOne({
      where: {
        slug
      }
    });
    if (!checkArticle) {
      return res.status(status.NOT_FOUND).json({
        status: status.NOT_FOUND,
        message: 'the article is not found'
      });
    }
    await Article.destroy({ where: { slug } });
    res.status(status.OK).json({
      status: res.statusCode,
      message: 'article deleted successful'
    });
  }
}
