import models from '../models';
import status from '../../helpers/constants/status.codes';
import generatePaginationDetails from '../../helpers/generate.pagination.details';

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
  static async getAuthor(req, res) {
    const { offset, limit } = req.query;
    const paginatedUser = await User.findAndCountAll({
      attributes: ['id', 'username', 'email'],
      include: [
        {
          model: Article,
          required: true,
          attributes: []
        }
      ],
      offset: offset || 0,
      limit: limit || 10
    });
    res.status(status.OK).send({
      status: status.OK,
      paginationDetails: generatePaginationDetails(paginatedUser.count,
        paginatedUser.rows,
        offset,
        limit),
      data: paginatedUser.rows
    });
  }
}
