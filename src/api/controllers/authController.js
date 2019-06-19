import bcrypt, { hashSync, genSaltSync } from 'bcrypt';
import models from '../models/index';
import generateToken from '../../helpers/tokens/generate.token';
import sendResult from '../../helpers/results/send.auth';
import status from '../../helpers/constants/status.codes';
import environments from '../../configs/environments';
import sendError from '../../helpers/error.sender';
import errors from '../../helpers/constants/error.messages';

const { User } = models;
const env = environments.currentEnv;
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
    const salt = genSaltSync(parseFloat(env.hashRounds));
    const hashedPassword = hashSync(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    const tokenData = { id: user.dataValues.id, username, email };
    const token = generateToken(tokenData, env.secret);
    return sendResult(res, status.CREATED, 'user created successfully', user, token);
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
          const tokenData = { id: user.dataValues.id, username: user.dataValues.username, email };
          const token = generateToken(tokenData, env.secret);
          return sendResult(res, status.OK, 'user logged in successfully', user, token);
        }
        return sendError(status.UNAUTHORIZED, res, 'password', errors.incorectPassword);
      }
      return sendError(status.NOT_FOUND, res, 'email', errors.unkownEmail);
    });
  }
}
