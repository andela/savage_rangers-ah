import _ from 'lodash';
import sendError from '../../helpers/error.sender';
import status from '../../helpers/constants/status.codes';

/**
 * A function to verify if the provided body is empty
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default (req, res, next) => {
  const error = 'Server unable to process the recieved data';
  if (_.isEmpty(req.body)) sendError(status.BAD_REQUEST, {}, res, error);
  else next();
};
