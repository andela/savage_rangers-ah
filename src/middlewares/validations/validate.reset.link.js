import sendError from '../../helpers/error.sender';
import decodeJwt from '../../helpers/tokens/decode.token';
import status from '../../helpers/constants/status.codes';
import errors from '../../helpers/constants/error.messages';

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
