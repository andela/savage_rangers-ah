import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';

const { Article } = models;
/**
 * check if the user is the owner of a certain article based on the slug
 *
 * @export
 * @class CheckUserOwnership
 */
class CheckUserOwnership {
  /**
   * this is a middleware which checks if the user is registered in to our database.
   *
   * @author Frank Mutabazi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @param { object } next the next route controller to be called
   * @memberof CheckUserOwnership
   * @returns {Object} res
   */
  static async checkOwner(req, res, next) {
    const { user: { id } } = req.user;
    const { slug } = req.params;

    const response = await Article.findOne({
      where: {
        slug,
        userId: id
      }
    });

    if (response) {
      req.Existing = response.dataValues;
      next();
    } else {
      res.status(statusCode.ACCESS_DENIED).json({ message: 'Please you must be the owner of this Article in order to modify it, Thanks' });
    }
  }
}

export default CheckUserOwnership;
