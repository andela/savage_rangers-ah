import decodeJwt from '../helpers/tokens/decode.token';
import sendError from '../helpers/error.sender';
import errorMessages from '../helpers/constants/error.messages';
import status from '../helpers/constants/status.codes';

const payload = (req, res, next) => {
  // initializing variables
  let tempUser;

  try {
    const token = req.headers.authorization.split(' ')[1];

    try {
      tempUser = decodeJwt(token);
      req.user = tempUser;
      next();
    } catch (error) {
      sendError(status.UNAUTHORIZED, res, 'token', errorMessages.token);
    }
  } catch (error) {
    sendError(status.BAD_REQUEST, res, 'authorisation', errorMessages.authorisation);
  }
};
export default payload;
