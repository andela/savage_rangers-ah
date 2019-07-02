import validationSchemas from '../../helpers/constants/validation.schemas';
import parameterCheck from '../../helpers/parameterCheck';

/**
 * A function to validate the route to get all the users
 * for a particular rating
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default async (req, res, next) => {
  // Initializing variables
  const { offset, limit } = req.query;
  const { slug, rating } = req.params;
  parameterCheck({
    slug, offset, limit, rating
  }, validationSchemas.ratingRoute, res, next);
};
