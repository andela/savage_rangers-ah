import validationSchemas from '../../helpers/constants/validation.schemas';
import parameterCheck from '../../helpers/parameterCheck';

/**
 * A function to validate the route to get tags from the
 * tags table
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default async (req, res, next) => {
  parameterCheck(req.query, validationSchemas.queryTagsTable, res, next);
};
