import cloudinary from 'cloudinary';

import models from '../models/index';
import sendProfile from '../../helpers/results/send.profile';
import status from '../../helpers/constants/status.codes';
import errorMessages from '../../helpers/constants/error.messages';

const { Article, User } = models;

/**
 * containing all user's
 * profile model controller(update, getUserProfile, read)
 * @export
 * @class ProfileController
 */
export default class ProfileController {
  /**
   *
   * update current user's profile
   * @static
   * @param {*} req The request Object
   * @param {*} res The response Object
   * @memberof ProfileController
   * @return {Object} The response Object
   */
  static async update(req, res) {
    const {
      country,
      firstName,
      lastName,
      address,
      gender,
      phoneNumber,
      bio,
      profileImage: existing
    } = req.body;

    let profileImage = existing || 'noimage.jpg';
    // upload the image to cloudinary
    if (req.file) {
      const image = await cloudinary.v2.uploader.upload(req.file.path);
      profileImage = image.secure_url;
    }
    const updatedProfile = await User.update({
      country,
      firstName,
      lastName,
      bio,
      address,
      gender,
      profileImage,
      phoneNumber
    },
    {
      where: {
        id: req.user.id
      }
    });
    return sendProfile(res, status.OK, 'updated correctly', updatedProfile);
  }

  /**
   *
   * get another user's profile
   * @static
   * @param {*} req The request Object
   * @param {*} res The response Object
   * @memberof ProfileController
   * @return {Object} The response Object
   */
  static async read(req, res) {
    const { username } = req.params;
    const { limit, offset } = req.query;
    // check if the user exists and send his profile
    try {
      const defaultPaginationLimit = 10;
      const paginationLimit = limit || defaultPaginationLimit;
      const user = await User.findOne({
        where: {
          username
        },
        attributes: [
          'username',
          'email',
          'profileImage',
          'bio',
          'firstName',
          'lastName',
          'address',
          'phoneNumber',
          'gender',
          'country'
        ],
        include: [
          {
            model: Article,
            offset,
            limit: paginationLimit
          }
        ]
      });
      if (user) return sendProfile(res, status.OK, undefined, user);
      return sendProfile(res, status.NOT_FOUND, errorMessages.noUser);
    } catch (err) {
      return res.status(status.SERVER_ERROR).json(err);
    }
  }

  /**
   *
   * get a user's profile
   * @static
   * @param {*} req The request Object
   * @param {*} res The response Object
   * @memberof ProfileController
   * @return {Object} The response Object
   */
  static async get(req, res) {
    const {
      user: { id }
    } = req.user;
    const { limit, offset } = req.query;
    // check if the user exists and send his profile

    const defaultPaginationLimit = 10;
    const paginationLimit = limit || defaultPaginationLimit;
    const user = await User.findOne({
      where: {
        id
      },
      attributes: [
        'username',
        'email',
        'profileImage',
        'bio',
        'firstName',
        'lastName',
        'address',
        'phoneNumber',
        'gender',
        'country'
      ],
      include: [
        {
          model: Article,
          offset,
          limit: paginationLimit
        }
      ]
    });
    sendProfile(res, status.OK, undefined, user);
  }
}
