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
    const { token } = req.params;
    const result = decodejwt(token);
    if (result !== undefined) {
      const action = await models.User.update({ verified: true }, {
        where: {
          email: result.user.email,
        }
      });
      const ZERO = 0;
      if (!action.includes(ZERO)) {
        res.status(status.OK).json({
          status: 200,
          message: 'Your email is successfully verified'
        });
      } else {
        error(status.NOT_FOUND, res, 'user', errorMessages.noUser);
      }
    } else {
      error(status.BAD_REQUEST, res, 'link', errorMessages.emailLinkInvalid);
    }
  }
}
