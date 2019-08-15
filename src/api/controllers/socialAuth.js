import module from '../models';
import generateToken from '../../helpers/tokens/generate.token';
import env from '../../configs/environments';
import socialToken from '../../helpers/commonAction/socialTokenGenerator';
import setDefaultConfigs from '../../helpers/create.default.notifications.config';

const { User } = module;

/**
 *
 *
 * @class socialLogin
 */
class socialLogin {
  /**
   * signup || login via facebook
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof socialLogin
   * @returns {object} - the response body
   *
   */
  static async facebookAuth(req, res) {
    let existingUser = await User.findOne({
      where: {
        uniqueId: req.user.id
      }
    });
    if (!existingUser) {
      existingUser = await User.create({
        username: req.user.name.familyName,
        profileImage: req.user.photos[0].value,
        provider: req.user.provider,
        uniqueId: req.user.id
      });
      // setting default notifications configurations
      await setDefaultConfigs(existingUser.dataValues.id);
    }
    const token = generateToken({
      id: existingUser.dataValues.id,
      username: existingUser.dataValues.username
    },
    process.env.TOKEN_KEY);
    const user = existingUser.dataValues;
    return res.redirect(`${env.APP_URL_FRONTEND}/redirect?token=${token}&username=${user.username}&email=${
      user.email
    }&profile=${user.profileImage}`);
  }

  /**
   * signup || login via Google
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - request response
   * @memberof socialLogin
   * @returns {object} - the response body
   *
   */
  static async googleAuth(req, res) {
    let existingUser = await User.findOne({
      where: {
        uniqueId: req.user.id
      }
    });
    if (!existingUser) {
      existingUser = await User.create({
        username: req.user.displayName,
        email: req.user.emails[0].value,
        profileImage: req.user.photos[0].value,
        provider: req.user.provider,
        uniqueId: req.user.id
      });
      // setting default notifications configurations
      await setDefaultConfigs(existingUser.dataValues.id);
      const token = generateToken({
        username: req.user.displayName,
        id: existingUser.dataValues.id
      },
      process.env.TOKEN_KEY);
      const user = existingUser.dataValues;
      return res.redirect(`${env.APP_URL_FRONTEND}/redirect?token=${token}&username=${user.username}&email=${
        user.email
      }&profile=${user.profileImage}`);
    }
    const token = generateToken({
      id: existingUser.dataValues.id,
      username: existingUser.dataValues.username
    },
    process.env.TOKEN_KEY);
    const user = existingUser.dataValues;
    return res.redirect(`${env.APP_URL_FRONTEND}/redirect?token=${token}&username=${user.username}&email=${
      user.email
    }&profile=${user.profileImage}`);
  }

  /**
   * signup || login user via Twitter
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - request response
   * @memberof socialLogin
   * @returns {object} - the response body
   *
   */
  static async twitterAuth(req, res) {
    let existingUser = await User.findOne({
      where: {
        uniqueId: req.user.id
      }
    });
    if (!existingUser) {
      existingUser = await User.create({
        username: req.user.username,
        profileImage: req.user.photos[0].value,
        provider: req.user.provider,
        uniqueId: req.user.id
      });
      // setting default notifications configurations
      await setDefaultConfigs(existingUser.dataValues.id);
      const token = socialToken(existingUser, req);
      const user = existingUser.dataValues;
      return res.redirect(`${env.APP_URL_FRONTEND}/redirect?token=${token}&username=${user.username}&email=${
        user.email
      }&profile=${user.profileImage}`);
    }
    const token = generateToken({
      id: existingUser.dataValues.id,
      username: existingUser.dataValues.username
    },
    process.env.TOKEN_KEY);
    const user = existingUser.dataValues;
    return res.redirect(`${env.APP_URL_FRONTEND}/redirect?token=${token}&username=${user.username}&email=${
      user.email
    }&profile=${user.profileImage}`);
  }
}

export default socialLogin;
