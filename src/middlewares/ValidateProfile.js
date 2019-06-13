import profile from '../helpers/validators/profile';

/**
 *
 *
 * @export
 * @class ProfileValidator
 */
export default class ProfileValidator {
  /**
  *
  *
  * @param  {object} req The request object containing method, body, params, query,...ß
  * @param  {object} res The response object for the request
  * @param  {function} next The next middleware function in the request pipeline
  * @returns {object} The response with status and data or error message
  */
  static async validate(req, res, next) {
    try {
      await profile(req.body);
      return next();
    } catch (error) {
      if (error.isJoi) {
        const [err] = error.details;
        const { message } = err;
        return res.status(400).json({ status: 400, message });
      }
      return res.status(400).json({ status: 400, error });
    }
  }
}
