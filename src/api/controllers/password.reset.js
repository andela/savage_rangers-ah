import { hashSync, genSaltSync } from 'bcrypt';
import models from '../models/index';
import mailer from '../../helpers/Mailer';
import environnement from '../../configs/environments';

const { User } = models;
const env = environnement.currentEnv;

/**
 * containing all user's model controllers (signup, login)
 *
 * @export
 * @class Auth
 */
export default class PasswordReset {
  /**
   * A controller to send an email to a user
   * requesting password recovery
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Boolean} true
   */
  static async sendRecoveryEmail(req, res) {
    // Initialising variables
    const result = {};
    const status = 200;
    const userEmail = req.body.email;
    const { username } = req.user;

    await mailer(
      `Password recovery for ${userEmail}`,
      'Password recovery',
      userEmail,
      'notifications',
      {
        email: userEmail,
        link: `${env.baseUrl}/api/auth/reset`,
        userName: username,
        buttonText: 'RESET',
        message:
          "You are recieving this email beacause you've requested the recovery "
          + 'of your Authors Heaven password. Kindly click the button bellow.'
      }
    );

    // Sending the result
    result.status = status;
    result.message = 'Password reset instructions have been sent '
      + "to your account's primary email address. If you don't find it, check your spams";
    res.status(status).json(result);
  }

  /**
   * A controller update the users email
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Boolean} true
   */
  static async updatePassword(req, res) {
    // Initialising variables
    const result = {};
    const status = 200;
    const userEmail = req.params.email;
    const userPassword = req.body.password;
    const salt = genSaltSync(parseFloat(process.env.BCRYPT_HASH_ROUNDS) || 10);
    const hashedPassword = hashSync(userPassword, salt);

    const user = await User.update(
      {
        password: hashedPassword
      },
      {
        where: {
          email: userEmail
        }
      }
    );

    // Sending the result
    result.status = status;
    result.message = 'Password reset sucessfully';
    result.user = user;
    res.status(status).json(result);
  }

  /**
   * A controller to send an approval to the user to
   * reset the password
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Boolean} true
   */
  static async verifyRecoveryLink(req, res) {
    // Initialising variables
    const result = {};
    const status = 200;
    const { userEmail } = req;

    // Sending the result
    result.status = status;
    result.message = 'Please provide your new password';
    result.data = {
      email: userEmail
    };
    res.status(status).json(result);
  }
}
