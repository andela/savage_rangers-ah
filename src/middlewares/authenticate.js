import jwt from 'jsonwebtoken';
import status from '../helpers/constants/status.codes';

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(status.ACCESS_DENIED).json({ status: 403, message: 'Token is required' });
    }
    const decoded = jwt.verify(req.headers.authorization, process.env.TOKEN_KEY);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({
      status: 401,
      message: 'Authentication failed, please check your credentials',
    });
  }
};
