import decode from '../helpers/tokens/decode.token';
import status from '../helpers/constants/status.codes';

const tokenVerifier = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const decoded = decode(bearerToken);
    if (decoded === undefined) {
      res.status(status.UNAUTHORIZED).json({
        status: 401,
        message: 'Unathorized'
      });
    } else {
      next();
    }
  }
};

export default tokenVerifier;
