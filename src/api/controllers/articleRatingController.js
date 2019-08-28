import _ from 'lodash';
import status from '../../helpers/constants/status.codes';
import models, { sequelize } from '../models';
import sendError from '../../helpers/error.sender';
import calculateRatingsPercentage from '../../helpers/calculate.ratings.percentages';
import errorMessages from '../../helpers/constants/error.messages';
import generatePaginationDetails from '../../helpers/generate.pagination.details';

const { Rating, User } = models;

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
    const {
      user: { id }
    } = req.user;

    if (req.article.author === req.user.user.id) {
      return sendError(status.BAD_REQUEST, res, 'auth', 'Sorry, you can not rate your own article');
    }

    Rating.create({
      userId: id,
      articleSlug: slug,
      rating: parseInt(rating, 10)
    });
    return res.status(status.CREATED).json({
      status: status.CREATED,
      message: `Rating for ${slug} submitted successfully`
    });
  }

  /**
   * A controller to calculate the ratings percentages,
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Object} res
   */
  static async getArticleRatingStatistics(req, res) {
    // Initialising variables
    const result = {};
    const { slug } = req.params;

    // Fetching the articles count per rating
    const ratingsCount = await Rating.findAll({
      where: {
        articleSlug: slug
      },
      group: ['rating'],
      attributes: ['rating', [sequelize.fn('COUNT', 'TagName'), 'count']]
    });

    // Sending the result
    if (_.isEmpty(ratingsCount)) {
      // Error if there are no ratings for the article
      sendError(status.NOT_FOUND, res, 'ratings', errorMessages.ratingsNotFound);
      result.status = status.NOT_FOUND;
    } else {
      // Calculating the percentages
      const ratingsWithPercentages = calculateRatingsPercentage(ratingsCount);

      // sending the result back
      result.status = status.OK;
      result.data = ratingsWithPercentages;
      res.status(status.OK).json(result);
    }
  }

  /**
   * A controller to get users for a given rating
   * with pagination support
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Object} res
   */
  static async getRatingUsers(req, res) {
    // Initialising variables
    const result = {};
    const { offset, limit } = req.query;
    const { slug, rating } = req.params;

    // Fetching data from the database
    const ratingUsers = await User.findAndCountAll({
      attributes: ['id', 'username', 'email', 'firstName', 'lastName'],
      include: [
        {
          model: Rating,
          where: {
            articleSlug: slug,
            rating
          },
          attributes: []
        }
      ],
      offset,
      limit
    });

    if (_.isEmpty(ratingUsers.rows)) {
      sendError(status.NOT_FOUND, res, 'Data', 'No users fond for the provided entries');
    } else {
      // sending the result back
      result.status = status.OK;
      result.paginationDetails = generatePaginationDetails(ratingUsers.count,
        ratingUsers.rows,
        offset,
        limit);
      result.data = ratingUsers.rows;
      res.status(status.OK).json(result);
    }
  }
}
export default RatingsController;
