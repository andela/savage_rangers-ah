import models from '../models';
import status from '../../helpers/constants/status.codes';

const { Article } = models;
const { User } = models;
/**
 *
 *
 * @export
 * @class getAuthors
 */
export default class getAuthors {
  /**
   *
   *
   * @static
   * @param {array} req - request array
   * @param {array} res - respond array
   * @returns {array} response body
   * @memberof getAuthors
   */
  static async authors(req, res) {
    const { userId } = req.params;
    const { id } = req.params;
    const existAuthors = Article.findAll({ where: { userId } });
    const authors = await User.findAll({ where: { id } === existAuthors });
    if (authors) {
      return res.status(status.OK).json({
        status: status.Ok,
        message: 'Authors'
      });
    }
    return res.status(status.NOT_FOUND).json({
      status: status.NOT_FOUND,
      message: 'No Author yey'
    });
  }
}
