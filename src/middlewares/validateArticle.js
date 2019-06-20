import articleValidator from '../helpers/validators/articleValidator';
import statusCode from '../helpers/constants/status.codes';

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
  static async validateArticle(req, res, next) {
    try {
      await articleValidator(req.body);
      return next();
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
