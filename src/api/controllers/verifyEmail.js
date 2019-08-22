import decodejwt from '../../helpers/tokens/decode.token';
import status from '../../helpers/constants/status.codes';
import models from '../models/index';
import error from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';
/**
 * @class
 */
export default class {
  /**
   * @description verification link controller
   * @param {*} req
   * @param {*} res
   * @returns {*} void
   */
  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const result = await decodejwt(token);
      const action = await models.User.update({ verified: true },
        {
          where: {
            email: result.email || result.user.email
          }
        });
      const ZERO = 0;
      if (!action.includes(ZERO)) {
        res.redirect(`${process.env.APP_URL_FRONTEND}/login`);
      } else {
        error(status.NOT_FOUND, res, 'user', errorMessages.noUser);
      }
    } catch (tokenError) {
      error(status.BAD_REQUEST, res, 'link', errorMessages.emailLinkInvalid);
    }
  }
}
