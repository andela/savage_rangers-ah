import bcrypt, { hashSync, genSaltSync } from 'bcrypt';
import models from '../models/index';
import generateToken from '../../helpers/tokens/generate.token';
import mailer from '../../helpers/Mailer';
import environnement from '../../configs/environnements';
import sendResult from '../../helpers/results/send.auth';

const { User } = models;
const env = environnement.currentEnv;

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
    const tokenData = { username, email };
    const token = generateToken(tokenData, process.env.TOKEN_KEY);
    return sendResult(res, 201, 'user created successfully', user, token);
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
    const username = 'premices';

    await mailer(`Password recovery for ${userEmail}`,
      'Password recovery',
      userEmail,
      'resetPassword',
      {
        email: userEmail,
        link: `${env.baseUrl}/api/auth/reset`,
        userName: username,
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
  static async updateEmail(req, res) {
    // Initialising variables
    const result = {};
    const status = 200;
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    await User.update({
      password: userPassword,
      where: {
        emai: userEmail,
      }
    });

    // Sending the result
    result.status = status;
    result.message = 'Password reset sucessfully';
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
