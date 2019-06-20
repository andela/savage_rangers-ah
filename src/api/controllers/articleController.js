import _ from 'lodash';
import models, { sequelize } from '../models/index';
import status from '../../helpers/constants/status.codes';
import sendError from '../../helpers/error.sender';
import calculateRatingsPercentage from '../../helpers/calculate.ratings.percentages';
import rawQueries from '../../helpers/constants/raw.queries';
import generateRatings from '../../helpers/generate.ratings';
import errorMessages from '../../helpers/constants/error.messages';

const { Rating } = models;

/**
 * containing aal controllers of the ratings process
 *
 * @export
 * @class ratings
 */
export default class articleRatings {
  /**
   * A controller to calculate the ratings percentages,
   * to add also pagination support
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Object} res
   */
  static async createArticleRating(req, res) {
    // Initialising variables
    const result = {};
    const { slug } = req.params;
    const { limit, offset } = req.query;
    let ratingsCount;

    // Fetching the articles count per rating
    try {
      ratingsCount = await Rating.findAll({
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

        // Fetching the users credentials from the ratings tables
        const usersWithRatings = await sequelize.query(rawQueries.ratingsWithUsers(slug));

        // Generating the expected object
        const ratings = generateRatings(ratingsWithPercentages,
          usersWithRatings,
          parseInt(offset, 10),
          parseInt(limit, 10));

        // sending the result back
        result.status = status.OK;
        result.data = ratings;
        res.status(status.OK).json(result);
      }
    } catch (error) {
      sendError(status.NOT_FOUND, res, 'db', 'Invalid offset provided');
    }
  }
}
