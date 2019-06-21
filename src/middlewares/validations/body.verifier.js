import _ from 'lodash';
import sendError from '../../helpers/error.sender';
import status from '../../helpers/constants/status.codes';
import errors from '../../helpers/constants/error.messages';

/**
 * A function to verify if the provided body is empty
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default (req, res, next) => {
  if (_.isEmpty(req.body)) sendError(status.BAD_REQUEST, res, 'body', errors.emptyBody);
  else next();
};
