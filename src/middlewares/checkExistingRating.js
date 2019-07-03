import models from '../api/models';
import status from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { Rating } = models;

/**
 * check if the user is the owner of a certain article based on the slug
 *
 * @export
 * @class CheckUserOwnership
 */
class checkExistingRating {
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
  static async ExistingRating(req, res, next) {
    const { user: { id } } = req.user;
    const { slug } = req.params;
    const { rating } = req.body;
    const response = await Rating.findOne({
      where: { userId: id, articleSlug: slug }
    });
    if (!response) {
      next();
    } else if (response.dataValues.rating === rating) {
      sendError(status.BAD_REQUEST,
        res,
        'Rating',
        'Sorry, you can not update this article twice with the same rating number, please update it');
    } else {
      Rating.update({ rating },
        {
          where: {
            userId: id,
            articleSlug: slug
          }
        }).then(() => {
        res.status(status.OK).json({
          status: status.OK,
          message: `You have successfully updated your Ratings for ${slug}`
        });
      });
    }
  }
}
export default checkExistingRating;
