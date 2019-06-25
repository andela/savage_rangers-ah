import models from '../models/index';
import status from '../../helpers/constants/status.codes';
import sendError from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';

const { Article } = models;

/**
 * containing all controllers of the Articles tags
 *
 * @export
 * @class articles
 */
export default class articleTags {
  /**
   * A controller to add a tag to an article
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Object} res
   */
  static async createArticleTag(req, res) {
    // Initialising variables
    const result = {};
    const { slug } = req.params;
    const { tag } = req.body;
    const { tagList } = req.Existing;

    if (tagList.includes(tag)) {
      return sendError(status.RESET_CONTENT, res, 'tagList', errorMessages.existingTag);
    }
    // Updating the tags
    tagList.push(tag);

    // Updating the tags
    await Article.update({
      tagList
    },
    {
      where: {
        slug
      }
    });

    // sending the result back
    result.status = status.OK;
    result.message = 'Tag added successfully';
    res.status(status.OK).json(result);
  }
}
