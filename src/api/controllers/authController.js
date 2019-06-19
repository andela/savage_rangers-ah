import bcrypt from 'bcrypt';
import models from '../models/index';
import generateToken from '../../helpers/tokens/generate.token';
import sendResult from '../../helpers/results/send.auth';
import status from '../../helpers/constants/status.codes';
import sendError from '../../helpers/error.sender';
import errors from '../../helpers/constants/error.messages';

const { User } = models;
/**
 * containing all user's model controllers (signup, login)
 * @export
 * @class Auth
 */
export default class Auth {
  /**
	 * @static
	 * @description register a new user
	 * @param {object} req the request
	 * @param {object} res the response to be sent
	 * @memberof Auth
	 * @returns {object} res
	 */
  static async signup(req, res) {
    const { TOKEN_KEY } = process.env;
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password
    });
    const tokenData = { username, email };
    const token = generateToken(tokenData, TOKEN_KEY);
    return sendResult(res, status.CREATED, 'user created successfully', user, token);
  }

  /**
	 * @static
	 * @description login an existing user
	 * @param {object} req the request
	 * @param {object} res the response to be sent
	 * @memberof Auth
	 * @returns {object} res
	 */
  static async login(req, res) {
    const { TOKEN_KEY } = process.env;
    const { email, password } = req.body;
    User.findByEmail(email).then((user) => {
      if (user) {
        const isPasswordValid = bcrypt.compareSync(password, user.dataValues.password);
        if (isPasswordValid) {
          const tokenData = { username: user.dataValues.username, email };
          const token = generateToken(tokenData, TOKEN_KEY);
          return sendResult(res, status.OK, 'user logged in successfully', user, token);
        }
        return sendError(status.UNAUTHORIZED, res, 'password', errors.incorectPassword);
      }
      return sendError(status.NOT_FOUND, res, 'email', errors.unkownEmail);
    });
  }
}
