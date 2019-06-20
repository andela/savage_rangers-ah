import passport from 'passport';
import statusCodes from '../helpers/constants/status.codes';
import errorMessages from '../helpers/constants/error.messages';

const { UNAUTHORIZED } = statusCodes;
const { authenticationMessage } = errorMessages;
export default (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user) => {
  if (!user) return res.status(UNAUTHORIZED).json({ message: authenticationMessage });
  req.user = user.dataValues;
  return next();
})(req, res, next);
