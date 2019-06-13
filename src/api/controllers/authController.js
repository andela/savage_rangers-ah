import bcrypt, { hashSync, genSaltSync } from 'bcrypt';
import models from '../models/index';
import generateToken from '../../helpers/tokens/generate.token';
import sendResult from '../../helpers/results/send.auth';
import mailer from '../../helpers/Mailer/index';
import environment from '../../configs/environments';

const env = environment.currentEnv;


const { User } = models;

/**
 * containing all user's model controllers (signup, login)
 *
 * @export
 * @class Auth
 */
export default class Auth {
  /**
   * register a new user
   *
   * @static
   * @param {*} req the request
   * @param {*} res the response to be sent
   * @memberof Auth
   * @returns {Object} res
   */
  static async signup(req, res) {
    const { username, email, password } = req.body;
    const salt = genSaltSync(parseFloat(process.env.BCRYPT_HASH_ROUNDS) || 10);
    const hashedPassword = hashSync(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await mailer('Please verify your email', 'Email verification', email, 'notifications', {
      email,
      buttonText: 'Verify',
      userName: username,
      message: 'Please click on the link to verify your email for authour\'s heaven,If you didn\'t request this delete this mail.',
      link: `${env.baseUrl}/auth/verifyEmail`

    });
    const tokenData = { username, email };
    const token = generateToken(tokenData, process.env.TOKEN_KEY);
    const message = 'Please check your email for the verification lik.';
    return sendResult(res, 201, `${message}`, user, token);
  }

  /**
   *login an existing user
   *
   * @static
   * @param {*} req the request
   * @param {*} res the response to be sent
   * @memberof Auth
   * @returns {Object} res
   */
  static async login(req, res) {
    const { email, password } = req.body;
    User.findByEmail(email).then((user) => {
      if (user) {
        const isPasswordValid = bcrypt.compareSync(password, user.dataValues.password);
        if (isPasswordValid) {
          const tokenData = { username: user.dataValues.username, email };
          const token = generateToken(tokenData, process.env.TOKEN_KEY);
          return sendResult(res, 200, 'user logged in successfully', user, token);
        }
        return res.status(401).json({
          message: 'password is incorrect'
        });
      }
      return res.status(404).json({
        message: 'user doesn\'t exist'
      });
    });
  }

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

    await mailer(`Password recovery for ${userEmail}`,
      'Password recovery',
      userEmail,
      'notifications',
      {
        email: userEmail,
        link: `${env.baseUrl}/api/auth/reset`,
        userName: username,
        buttonText: 'RESET',
        message: 'You are recieving this email beacause you\'ve requested the recovery '
           + 'of your Authors Heaven password. Kindly click the button bellow.'
      });

    // Sending the result
    result.status = status;
    result.message = 'Password reset instructions have been sent '
       + 'to your account\'s primary email address. If you don\'t find it, check your spams';
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

    const user = await User.update({
      password: hashedPassword
    }, {
      where: {
        email: userEmail,
      }
    });

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
      email: userEmail,
    };
    res.status(status).json(result);
  }
}
