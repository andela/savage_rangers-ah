import Joi from '@hapi/joi';
import sendError from '../../helpers/error.sender';
import validationSchemas from '../../helpers/constants/validation.schemas';
import status from '../../helpers/constants/status.codes';

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
  // Initializing variables
  const { offset, limit, tagNameContent } = req.query;

  Joi.validate({
    offset,
    limit,
    tagNameContent
  },
  validationSchemas.queryTagsTable,
  async (err) => {
    if (!err) next();
    else {
      sendError(status.BAD_REQUEST,
        res,
        'url parameter',
        err.details[0].message.replace(/['"]/g, ''));
    }
  });
};
