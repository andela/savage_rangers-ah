import 'dotenv/config';
import jwt from 'jsonwebtoken';
import statuses from '../helpers/constants/status.codes';
import env from '../configs/environments';

/**
 * A middleware to verify if the token is either valid or invalid
 * remember this middleware still needs to check if the token has been dropped or not (REDIS)
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
    next();
  } catch (err) {
    res.status(statuses.UNAUTHORIZED).json({
      status: statuses.UNAUTHORIZED,
      message: 'Forbiden access'
    });
  }
};

export default validToken;
