import models from '../models';
import statusCode from '../../helpers/constants/status.codes';

/**
 * Contains  comment reactions controllers
 * @export
 * @class commentReactionsController
 */
export default class commentReactionsController {
  /**
   * add a new like or dislike
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof commentReactionController
   * @returns {Object} res
   */
  static async likeComment(req, res) {
    const { commentId } = req.params;
    const { id } = req.user.user;
    const hasDisliked = await models.Reaction.findOne({
      where: {
        commentId,
        userId: id,
        dislikes: 1,
        likes: 0
      }
    });
    if (hasDisliked) {
      await models.Reaction.update({ dislikes: 0, likes: 1 },
        { where: { id: hasDisliked.dataValues.id } });
      return res.status(statusCode.OK).json({
        status: statusCode.OK,
        message: ' You have successfully  liked this comment '
      });
    }
    await models.Reaction.create({
      userId: id,
      commentId,
      dislikes: 0,
      likes: 1
    });

    return res.status(statusCode.CREATED).json({
      status: statusCode.CREATED,
      message: ' You have successfully  liked this comment '
    });
  }

  /**
   * @description - Users should be able to dislike a comment
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static async dislikeComment(req, res) {
    const { commentId } = req.params;
    const { id } = req.user.user;
    const hasLiked = await models.Reaction.findOne({
      where: {
        commentId,
        userId: id,
        likes: 1
      }
    });
    if (hasLiked) {
      await models.Reaction.update({ dislikes: 1, likes: 0 },
        { where: { id: hasLiked.dataValues.id } });
      return res.status(statusCode.OK).json({
        status: statusCode.OK,
        message: ' You have successfully  disliked this comment '
      });
    }

    models.Reaction.create({
      userId: id,
      commentId,
      dislikes: 1,
      likes: 0
    });

    return res.status(statusCode.CREATED).json({
      status: statusCode.CREATED,
      message: ' You have successfully  disliked this comment '
    });
  }

  /**
   * @description - Users should be able to count numbers of likes
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static async getLikeCount(req, res) {
    const { commentId } = req.params;
    const likeCount = await models.Reaction.count({
      where: {
        commentId,
        likes: 1
      }
    });
    return res.status(statusCode.OK).json({
      status: statusCode.OK,
      likeCount
    });
  }

  /**
   * @description - Users should be able to count numbers of dislikes
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static async getDislikeCount(req, res) {
    const { commentId } = req.params;
    const disLikeCount = await models.Reaction.count({
      where: {
        commentId,
        dislikes: 1
      }
    });
    return res.status(statusCode.OK).json({
      status: statusCode.OK,
      disLikeCount
    });
  }
}
