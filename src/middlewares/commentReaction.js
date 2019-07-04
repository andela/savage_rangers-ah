import models from '../api/models';
import statusCodes from '../helpers/constants/status.codes';

/**
 * @class checkLikesDislikes
 * @description a class to check if a user has already like or disliked a comment
 */
export default class checkReactions {
  /**
   * Verify if the user has already liked the comment
   * @param {Object} req - Request
   * @param {Object} res  - Response
   * @param {Function} next -Next
   * @returns {Object} The response object
   */
  static async liked(req, res, next) {
    const { commentId } = req.params;
    const { id } = req.user.user;
    const hasLiked = await models.Reaction.findOne({
      where: {
        commentId,
        userId: id,
        likes: 1
      }
    });
    // If the user has already liked that comment
    if (hasLiked) {
      return res.status(statusCodes.BAD_REQUEST).json({
        status: statusCodes.BAD_REQUEST,
        message: 'You have already liked this comment!'
      });
    }
    next();
  }

  /**
   * Verify if the user has already disliked the comment
   * @param {Object} req - Request
   * @param {Object} res  - Response
   * @param {Function} next -Next
   * @returns {Object} The response object
   */
  static async disliked(req, res, next) {
    const { commentId } = req.params;
    const { id } = req.user.user;
    const hasDisliked = await models.Reaction.findOne({
      where: {
        commentId,
        userId: id,
        dislikes: 1
      }
    });
    // If the user has already disliked that comment
    if (hasDisliked) {
      return res.status(statusCodes.BAD_REQUEST).json({
        status: statusCodes.BAD_REQUEST,
        message: 'You have already disliked this comment!'
      });
    }
    next();
  }
}
