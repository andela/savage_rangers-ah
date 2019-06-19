import decodejwt from '../../helpers/tokens/decode.token';
import models from '../models/index';
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
      if (action[0] !== 0) {
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
    } else {
      res.status(400).json({
        status: 400,
        message: 'The link provided is  corrupt, please request a new one or try to click it again'
      });
    }
  }
}
