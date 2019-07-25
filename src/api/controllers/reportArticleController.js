import models from '../models/index';
import errorSender from '../../helpers/error.sender';
import statusCodes from '../../helpers/constants/status.codes';
import errorMessage from '../../helpers/constants/error.messages';

const { Report } = models;
/**
 * @class reportArticleController
 */
export default class reportArticleController {
  /**
   * allow an author to report a certain article as inappropriate
   *
   * @author Frank Mutabazi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof reportArticleController
   * @returns {Object} res
   */
  static async reportAnArticle(req, res) {
    const { slug } = req.params;
    const { reason } = req.body;
    const { user: { id } } = req.user;
    try {
      const response = await Report.findOrCreate({
        where: {
          userId: id,
          reportedArticleSlug: slug,
          reasonId: reason
        }
      });

      return response[0]._options.isNewRecord === false
        ? errorSender(statusCodes.BAD_REQUEST,
          res,
          'Message',
          `Sorry, You can not report this ${slug} with the same reason twice, Thanks `)
        : res.status(statusCodes.CREATED).json({
          status: statusCodes.CREATED,
          message: `Report for ${slug} is successfully submitted, Thanks`
        });
    } catch (SequelizeForeignKeyConstraintError) {
      errorSender(statusCodes.NOT_FOUND, res, 'Message', errorMessage.notAValidReason);
    }
  }
}
