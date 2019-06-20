import cloudinary from 'cloudinary';
import models from '../models/index';
import sendProfile from '../../helpers/results/send.profile';
import status from '../../helpers/constants/status.codes';

const { User } = models;

/**
 *
 *
 * @export
 * @class ProfileController
 */
export default class ProfileController {
  /**
     *
     *
     * @static
     * @param {*} req The request Object
     * @param {*} res The response Object
     * @memberof ProfileController
     * @return {Object} The response Object
     */
  static async update(req, res) {
    try {
      let avatar = 'noimage.jpg';
      const {
        country, firstName, lastName, address, gender, phoneNumber, bio
      } = req.body;
      if (req.file) {
        const saved = await cloudinary.v2.uploader.upload(req.file.path);
        avatar = saved.secure_url;
      }
      const updatedProfile = await User.update({
        country, firstName, lastName, bio, address, gender, avatar, phoneNumber
      }, {
        where: {
          id: req.user.id
        }
      });
      sendProfile(res, status.OK, 'updated correctly', updatedProfile);
    } catch (error) {
      sendProfile(res, status.SERVER_ERROR, error);
    }
  }

  /**
     *
     *
     * @static
     * @param {*} req The request Object
     * @param {*} res The response Object
     * @memberof ProfileController
     * @return {Object} The response Object
     */
  static async getUserProfile(req, res) {
    try {
      const userProfile = await User.findOne({
        where: {
          id: req.user.id
        }
      });
      sendProfile(res, status.OK, undefined, userProfile.dataValues);
    } catch (error) {
      sendProfile(res, status.SERVER_ERROR, error);
    }
  }

  /**
     *
     *
     * @static
     * @param {*} req The request Object
     * @param {*} res The response Object
     * @memberof ProfileController
     * @return {Object} The response Object
     */
  static async read(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne({
        where: {
          username
        }
      });
      if (user) return sendProfile(res, status.OK, undefined, user);
      sendProfile(res, status.NOT_FOUND, 'User doesn\'t exist');
    } catch (error) {
      sendProfile(res, status.SERVER_ERROR, error);
    }
  }
}
