import model from '../models';
import slugHelper from '../../helpers/slug.maker';
import statuses from '../../helpers/constants/status.codes';

const { Article } = model;


/**
 * this is the controller to update the article
 *
 * @export
 * @class UpdateArticle
 */
class UpdateArticle {
  /**
   * allow an author to update his/her article
   *
   * @author Frank Mutabazi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof UpdateArticle
   * @returns {Object} res
   */
  static async articleUpdate(req, res) {
    const { slug } = req.params;
    const {
      title, description, body, tagList, category
    } = req.body;

    const slugCreation = slugHelper(title || req.Existing.title);

    const updateContent = {
      slug: slugCreation,
      title: title || req.Existing.title,
      description: description || req.Existing.description,
      body: body || req.Existing.body,
      tagList: tagList || req.Existing.tagList,
      category: category || req.Existing.category
    };
    await Article.update({
      slug: updateContent.slug,
      title: updateContent.title,
      description: updateContent.description,
      body: updateContent.body,
      tagList: updateContent.tagList,
      category: updateContent.category,
    }, {
      where: {
        slug,
      }
    });
    return res.status(statuses.OK).json({
      status: statuses.OK,
      message: 'Your Article is up-to-date now, Thanks',
    });
  }
}

export default UpdateArticle;
