import models from '../api/models';
import signupValidator from '../helpers/validators/signupValidator';
import statusCode from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { User } = models;
/**
 * @class
 */
export default class {
  /**
   * @param  {object} req The request object containing method, body, params, query,...ß
   * @param  {object} res The response object for the request
   * @param  {function} next The next middleware function in the request pipeline
   * @returns {object} The response with status and data or error message
   */
  static async validateSignup(req, res, next) {
    const { email } = req.body;
    try {
      await signupValidator(req.body);
      const emailExists = await User.findByEmail(email);
      if (emailExists) sendError(statusCode.BAD_REQUEST, res, 'email', ' The user already exists');
      else return next();
    } catch (error) {
      if (error.isJoi) {
        const [err] = error.details;
        const { message } = err;
        return res.status(statusCode.BAD_REQUEST).json({ message });
      }
      return res.status(statusCode.BAD_REQUEST).json({ error });
    }
  }
}
