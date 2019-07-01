import models from '../api/models';
import status from '../helpers/constants/status.codes';

const { User } = models;
/**
 * check if user exist
 *
 * @export
 * @class CheckUser
 */
class checkIfUserExist {
  /**
   * this is a middleware which checks if the user is registered in to our database.
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof CheckUser
   * @returns {Object} res
   */
  static async checkIfUserExist(req, res, next) {
    const { email } = req.params;

    const result = await User.findOne({
      where: {
        email
      }
    });

    return result ? next() : res.status(status.NOT_FOUND).json({ message: "User doesn't exist." });
  }
}

export default checkIfUserExist;
