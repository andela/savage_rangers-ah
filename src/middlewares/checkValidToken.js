import jwt from 'jsonwebtoken';
import 'dotenv/config';
import isTokenDropped from '../helpers/tokens/getRedisToken';
import statuses from '../helpers/constants/status.codes';
import env from '../configs/environments';

/**
 * A middleware to verify if the token is either valid or invalid
 *
 * @author Frank Mutabazi
 * @param {Object} req - The request object
 * @param {Object} res - The result object
 * @param {object} next - The next callback route controller
 * @returns {Function} - returns
 */
const validToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const payloadData = await jwt.verify(token, env.secret);
    req.user = payloadData;

    const tokenStatus = await isTokenDropped(token);
    if (tokenStatus === 'dropped') {
      return res.send({ status: statuses.UNAUTHORIZED, error: 'Token is no longer valid' });
    }
    next();
  } catch (err) {
    res.status(statuses.UNAUTHORIZED).json({
      status: statuses.UNAUTHORIZED,
      message: 'Forbiden access',
      error: `${err}`
    });
  }
};

export default validToken;
