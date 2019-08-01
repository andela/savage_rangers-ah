import { hashSync, genSaltSync } from 'bcrypt';
import models from '../models/index';
import generateToken from '../../helpers/tokens/generate.token';
import mailer from '../../helpers/Mailer';
import env from '../../configs/environments';
import status from '../../helpers/constants/status.codes';

const { User } = models;

/**
 * containing aal controllers of the signup process
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
    const { username, email } = req.user;

    await mailer(`Password recovery for ${email}`,
      'Password recovery',
      email,
      'passwordResetEmailConfig',
      {
        email,
        link: `${env.baseUrl}/api/password-reset`,
        userName: username,
        buttonText: 'RESET',
        message:
          "You are receiving this email because you've requested the recovery "
          + 'of your Authors Heaven password. Kindly click the button below.'
      });

    // Sending the result
    result.status = status.OK;
    result.message = 'Password reset instructions have been sent '
      + "to your account's primary email address. Please check the spam if you don't see the email";
    res.status(status.OK).json(result);
  }

  /**
   * A controller update the users password
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Boolean} true
   */
  static async updatePassword(req, res) {
    // Initialising variables
    const result = {};
    const userEmail = req.params.email;
    const userPassword = req.body.password;
    const salt = genSaltSync(parseFloat(env.hashRounds));
    const hashedPassword = hashSync(userPassword, salt);

    await User.update({
      password: hashedPassword
    },
    {
      where: {
        email: userEmail
      }
    });

    const tokenData = { id: req.user.id, username: req.user.username, email: req.user.email };
    const token = generateToken(tokenData, env.secret);

    // Sending the result
    result.status = status.OK;
    result.message = 'Password reset successfully';
    result.user = req.user;
    result.token = token;
    res.status(status.OK).json(result);
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
    // Initializing variables
    const { userEmail } = req;

    // redirecting
    res.redirect(`${env.APP_URL_FRONTEND}/reset-password?email=${userEmail}`);
  }
}
