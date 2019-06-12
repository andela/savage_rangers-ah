import decodejwt from '../../helpers/tokens/decode.token';
import models from '../models/index';
/**
 * @class
 */
export default class {
  /**
     *
     * @param {*} req
     * @param {*} res
     * @returns {*} void
     */
  static async verifyEmail(req, res) {
    const { token } = req.params;
    const result = decodejwt(token);

    if (result) {
      await models.User.update({ verified: true }, {
        where: {
          email: result.user.email,
        }
      });
      res.status(200).json({
        status: 200,
        message: 'Your email is successfully verified'
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'User doesn\'t exist.'
      });
    }
  }
}
