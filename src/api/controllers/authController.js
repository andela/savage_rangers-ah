import bcrypt, { hashSync, genSaltSync } from 'bcrypt';
import models from '../models/index';
import generateToken from '../../helpers/tokens/generate.token';
import sendResult from '../../helpers/results/send.auth';
import blackList from '../../helpers/Blacklist.redis';

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
    const salt = genSaltSync(parseFloat(process.env.BCRYPT_HASH_ROUNDS));
    const hashedPassword = hashSync(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
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

    const user = await User.findByEmail(email);
    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.dataValues.password);
      if (isPasswordValid) {
        const tokenData = { id: user.dataValues.id, username: user.dataValues.username, email };
        const token = generateToken(tokenData, process.env.TOKEN_KEY);
        return sendResult(res, 200, 'user logged in successfully', user, token);
      }
      return res.status(401).json({
        message: 'password is incorrect'
      });
    }
    res.status(404).json({
      message: 'user doesn\'t exist'
    });
  }

  /**
   * Signout a user from the system
   *
   * @author: Frank Mutabazi
   * @static
   * @param {object} req - the request object
   * @param {object} res - the result object
   * @memberof signout
   * @returns {object} - the response body
   */
  static async signout(req, res) {
    const getTokenFromHeaders = req.headers.authorization;
    const blackToken = await blackList(getTokenFromHeaders);

    if (blackToken) {
      return res.status(200).json({
        status: 200,
        message: 'You are signed out'
      });
    }
  }
}
