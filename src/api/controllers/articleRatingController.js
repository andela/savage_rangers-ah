import model from '../models';
import status from '../../helpers/constants/status.codes';

const { Rating } = model;


/**
 *
 *
 * @class RatingsController
 */
class RatingsController {
  /**
   *this is the controller which enables the user to rate a certain article
   *
   * @author Frank Mutabazi
   * @static
   * @param {object} req - this is the request object
   * @param {object} res - this is the response object
   * @returns {object} - this function returns an object
   * @memberof RatingsController
   */
  static async rateArticle(req, res) {
    const { slug } = req.params;
    const { rating } = req.body;
    const { user: { id } } = req.user;

    Rating.create({
      userId: id,
      articleSlug: slug,
      rating: parseInt(rating, 10)
    });
    res.status(status.CREATED).json({
      status: status.CREATED,
      message: `Rating for ${slug} submitted successfully`
    });
  }
}
export default RatingsController;
