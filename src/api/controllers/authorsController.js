/* eslint-disable no-magic-numbers */
import models from '../models';
import status from '../../helpers/constants/status.codes';
import generatePaginationDetails from '../../helpers/generate.pagination.details';

const { Article } = models;
const { User } = models;
/**
 * contain a methode to fetck all authors in the system
 *
 * @export
 * @class authorsController
 */
export default class authorsController {
  /**
   * fetck all authors in the system
   *
   * @static
   * @param {array} req - request array
   * @param {array} res - respond array
   * @returns {array} response body
   * @memberof getAuthors
   */
  static async getAuthors(req, res) {
    const { offset = 0, limit = 10 } = req.query;
    const paginatedUser = await User.findAndCountAll({
      attributes: ['id', 'username', 'email', 'bio', 'profileImage'],
      distinct: true,
      include: {
        model: Article,
        required: true,
        attributes: ['id']
      },
      offset,
      limit
    });

    res.status(status.OK).send({
      status: status.OK,
      paginationDetails: generatePaginationDetails(paginatedUser.count,
        paginatedUser.rows,
        offset,
        limit),
      authors: paginatedUser.rows
    });
  }
}
