import models, { sequelize } from '../models/index';
import status from '../../helpers/constants/status.codes';
import errorSender from '../../helpers/error.sender';
import errorMessage from '../../helpers/constants/error.messages';
import getFollowingScript from '../../helpers/commonAction/getFollowingScript';


/**
 * @class
 */
export default class FollowingController {
  /**
   * This function add the follow count to the database
   * @param {object} req request sent by user
   * @param {object} res response after excution of request
   * @memberof Follow
   * @return {object} res
   */
  static async follow(req, res) {
    const { username } = req.params;
    const follower = req.user.user.username;
    try {
      await models.Following.create({
        follower,
        following: username
      });
      res.status(status.CREATED).json({
        status: 201,
        message: `You are now following ${username}`
      });
    } catch (error) {
      const selfFollowErrorCode = '23514';
      const duplicateErrorCode = '23505';

      if (error.original.code === selfFollowErrorCode) {
        errorSender(status.ACCESS_DENIED, res, 'User', errorMessage.followError);
      }
      if (error.original.code === duplicateErrorCode) {
        errorSender(status.BAD_REQUEST, res, 'follow', `Already following ${username}`);
      }
    }
  }

  /**
 * This function creates the unfollow process by deleting the user
 * @param {object} req request sent by user
 * @param {object} res response after execution of request
 * @memberof Follow
 * @returns {object} res
 */
  static async unfollow(req, res) {
    const { username } = req.params;
    const follower = req.user.user.username;

    const unfollowAct = await models.Following.destroy({
      where: {
        following: username,
        follower
      }
    });

    if (unfollowAct) {
      res.status(status.OK).json({
        status: 200,
        message: `Successfully unfollowed ${username}`
      });
    } else {
      errorSender(status.NOT_FOUND, res, 'user', `You are not following ${username}`);
    }
  }

  /**
   * Gets a list of users following the user.
   * @static
   * @param {object} req request sent by the user
   * @param {object} res response after excution of user request
   * @return {object} void
   * @memberof Follow
   *
   */
  static getUserfollower(req, res) {
    getFollowingScript(req, res, 'following', sequelize, errorMessage.followerError, 'follower');
  }

  /**
   * Gets a list of users that are followed by the user.
   * @static
   * @param {object} req request sent by the user
   * @param {object} res response after excution of user request
   * @return {object} void
   * @memberof Follow
   *
   */
  static async getUserfollowing(req, res) {
    getFollowingScript(req, res, 'follower', sequelize, errorMessage.followingError, 'following');
  }
}
