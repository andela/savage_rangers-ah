import statusCodes from '../helpers/constants/status.codes';
import errorMessages from '../helpers/constants/error.messages';

const { BAD_REQUEST, SERVER_ERROR } = statusCodes;
const { serverError } = errorMessages;

export default callback => async (req, res, next) => {
  try {
    await callback(req, res, next);
  } catch (error) {
    const { parent, details } = error;
    if (parent) return res.status(SERVER_ERROR).json({ message: parent.detail });
    if (details) return res.status(BAD_REQUEST).json({ message: details[0].message });
    return res.status(SERVER_ERROR).json({ message: serverError });
  }
};
