import models from '../models/index';
import errorSender from '../../helpers/error.sender';
import statusCodes from '../../helpers/constants/status.codes';
import errorMessage from '../../helpers/constants/error.messages';
import number from '../../helpers/constants/numbers';

const { Highlight } = models;
const { CREATED, OK, NOT_FOUND } = statusCodes;
/**
 * @class highlightController
 */
export default class highlightController {
  /**
   * allow a user to highlight a text in an article
   *
   * @author Alain Burindi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async highlight(req, res) {
    const { slug } = req.params;
    const {
      startIndex, lastIndex, text, comment, nodeId
    } = req.body;
    const userId = req.user.user.id;
    const highlighted = await Highlight.create({
      startIndex,
      lastIndex,
      text,
      comment,
      articleSlug: slug,
      userId,
      nodeId
    });
    res.status(CREATED).json({
      status: CREATED,
      highlighted
    });
  }

  /**
   * allow a user to get highlighted text in an article
   *
   * @author Alain Burindi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async getHighlight(req, res) {
    const { slug } = req.params;
    const highlighted = await Highlight.findAll({
      where: {
        articleSlug: slug
      }
    });
    if (highlighted.length > number.ZERO) {
      res.status(OK).json({
        status: OK,
        highlighted
      });
    } else {
      errorSender(NOT_FOUND, res, 'highlited', errorMessage.noHighlight);
    }
  }
}
