import statusCodes from '../helpers/constants/status.codes';
import errorSender from '../helpers/error.sender';

const { BAD_REQUEST, SERVER_ERROR } = statusCodes;

export default callback => async (req, res, next) => {
  try {
    await callback(req, res, next);
  } catch (error) {
    const { parent, isJoi = false, details } = error;
    if (parent) return errorSender(SERVER_ERROR, res, 'internal server error', parent.detail);
    if (isJoi) return errorSender(BAD_REQUEST, res, 'internal server error', details[0].message);
    return res.status(SERVER_ERROR).json(error);
  }
};
