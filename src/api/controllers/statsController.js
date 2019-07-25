import models from '../models/index';
import statusCodes from '../../helpers/constants/status.codes';

const { OK } = statusCodes;

const { Read, Share, Comment } = models;
/**
 * @class statsController
 */
export default class statsController {
  /**
  * allow a user to get statistics of an article
  *
  * @author Alain Burindi
  * @static
  * @param {object} req the request
  * @param {object} res the response to be sent
  * @memberof ArticleController
  * @returns {Object} res
  */
  static async stats(req, res) {
    const { slug } = req.params;
    const whereClause = {
      where: { articleSlug: slug }
    };
    const reads = await Read.count({
      ...whereClause
    });
    const shares = await Share.count({
      ...whereClause
    });
    const comments = await Comment.count({
      ...whereClause
    });
    res.status(OK).json({
      status: OK,
      article: {
        slug,
        stats: { reads, shares, comments }
      }
    });
  }
}
