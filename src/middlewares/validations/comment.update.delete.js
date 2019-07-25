
import parameterCheck from '../../helpers/parameterCheck';
import validationSchemas from '../../helpers/constants/validation.schemas';

/**
 * A function to validate the route to update and delete
 * a single comment
 * of a given article
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default (req, res, next) => {
  // Initializing variables
  const { slug, id } = req.params;
  parameterCheck({ slug, id }, validationSchemas.commentUpdateDeleteRoute, res, next);
};
