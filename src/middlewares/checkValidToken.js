import jwt from 'jsonwebtoken';
import 'dotenv/config';
import isTokenDropped from '../helpers/tokens/getRedisToken';
import statuses from '../helpers/constants/status.codes';

/**
 * A middleware to verify if the token is either valid or invalid
 *
 * @author Frank Mutabazi
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {Array} next - The next callback route controller
 * @returns {Function} - returns
 */
const validToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const tokenStatus = await isTokenDropped(token);
    if (tokenStatus === 'dropped') {
      return res.send({ status: statuses.UNAUTHORIZED, error: 'Token is no longer valid' });
    }
    await jwt.verify(token, process.env.TOKEN_KEY);
    next();
  } catch (err) {
    res.status(statuses.UNAUTHORIZED).json({
      status: statuses.UNAUTHORIZED,
      message: 'Forbiden access'
    });
  }
};

export default validToken;
