import models from '../models';

const { Token } = models;

/**
 * The signout controller
 *
 * @class signout
 */
class signout {
  /**
   * Signout a user from the system
   *
   * @static
   * @param {object} req - the request object
   * @param {object} res - the result object
   * @memberof signout
   * @returns {object} - the response body
   */
  static async signout(req, res) {
    const getToken = req.headers.authorization;

    const desToken = await Token.destroy({
      where: {
        data: getToken
      }
    });

    if (desToken) {
      return res.status(200).json({
        status: 200,
        message: 'You are signed out'
      });
    }
    res.status(404).json({
      status: 404,
      message: 'You must first sign in, Thanks'
    });
  }
}


export default signout;
