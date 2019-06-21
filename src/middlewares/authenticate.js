import jwt from 'jsonwebtoken';
import status from '../helpers/constants/status.codes';

export default (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.TOKEN_KEY);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({
      status: status.UNAUTHORIZED,
      message: 'Authentication failed, please check your credentials',
    });
  }
};
