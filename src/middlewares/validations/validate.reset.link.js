import sendError from '../../helpers/error.sender';
import decodeJwt from '../../helpers/tokens/decode.token';

export default (req, res, next) => {
  // Initializing variables
  let decoded;
  try {
    decoded = decodeJwt(req.params.token);
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    const err = 'Invalid link provided';
    sendError(400, {}, res, err);
  }
};
