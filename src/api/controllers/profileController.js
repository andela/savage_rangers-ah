import models from '../models/index';
import sendProfile from '../../helpers/results/send.profile';


const { Profile } = models;
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
  static async create(req, res) {
    const {
      country, firstName, lastName,
      address, gender, avatar, phoneNumber, bio
    } = req.body;
    try {
      const createdProfile = await Profile.create({
        country, firstName, lastName, bio, address, gender, avatar, phoneNumber, userId: req.user.id
      });
      return sendProfile(res, 201, 'created successfully', createdProfile);
    } catch (error) {
      return res.status(500).json(error);
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
  static async update(req, res) {
    const {
      country, firstName, lastName,
      address, gender, avatar, phoneNumber, bio
    } = req.body;
    try {
      const updatedProfile = await Profile.update({
        country, firstName, lastName, bio, address, gender, avatar, phoneNumber
      }, {
        where: {
          userId: req.user.id
        }
      });
      if (updatedProfile) {
        return sendProfile(res, 200, 'updated correctly', updatedProfile);
      }
    } catch (error) {
      return res.status(500).json(error);
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
      const userProfile = await Profile.findOne({
        where: {
          userId: req.user.id
        }
      });
      return sendProfile(res, 200, undefined, userProfile,
        { username: req.user.username, email: req.user.email });
    } catch (error) {
      return res.status(500).json({ message: error });
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
      if (user) {
        const { id, email } = user.dataValues;
        const profile = await Profile.findOne({
          where: {
            userId: id
          }
        });
        sendProfile(res, 200, undefined, profile,
          { username, email });
      } else {
        return res.status(404).json({ message: 'User doesn\'t exist' });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
