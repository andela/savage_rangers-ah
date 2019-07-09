import jwt from 'jsonwebtoken';
import env from '../configs/environments';

/**
 * An optional middleware to verify if the token is either valid or invalid
 * just to get the user if is authenticated
 *
 * @author Alain Burindi
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {object} next - The next callback route controller
 * @returns {Function} - returns
 */
export default (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const payloadData = jwt.verify(token, env.secret);
    req.user = payloadData.user;
    next();
  } catch (err) {
    next();
  }
};
