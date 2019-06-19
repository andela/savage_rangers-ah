import sendError from '../../helpers/error.sender';
import decodeJwt from '../../helpers/tokens/decode.token';
import status from '../../helpers/constants/status.codes';
import errors from '../../helpers/constants/error.messages';

/**
 * A function to verify if the provided link is still valid then decode it
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback
 * @returns {Function} - A fuction rendering an arror message
 * or the next callback
 */
export default (req, res, next) => {
  // Initializing variables
  let decoded;
  try {
    decoded = decodeJwt(req.params.token);
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    sendError(status.BAD_REQUEST, res, 'link', errors.invalidLink);
  }
};
