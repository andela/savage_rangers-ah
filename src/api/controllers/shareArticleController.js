import models from '../models/index';
import statusCodes from '../../helpers/constants/status.codes';

const { Share } = models;
/**
 * @class shareArticleController
 */
export default class shareArticleController {
  /**
   * allow an author to report a certain article as inappropriate
   *
   * @author Frank Mutabazi
   * allow a user to share an article on social media
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async socialShareArticle(req, res) {
    const { slug } = req.params;
    const { sharedOn } = req;
    const { title } = req;

    await Share.create({
      articleSlug: slug,
      sharedOn
    });

    return res.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `${title} has been shared successfully on ${sharedOn}, Thanks`
    });
  }
}
