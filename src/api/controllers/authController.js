import bcrypt, { hashSync, genSaltSync } from 'bcrypt';
import models from '../models/index';
import generateToken from '../../helpers/tokens/generate.token';
import sendResult from '../../helpers/results/send.auth';

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
    const tokenData = { id: user.dataValues.id, username, email };
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
  static login(req, res) {
    const { email, password } = req.body;
    User.findByEmail(email).then((user) => {
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
      return res.status(404).json({
        message: 'user doesn\'t exist'
      });
    });
  }
}
