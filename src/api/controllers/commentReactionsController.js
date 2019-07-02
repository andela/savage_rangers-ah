
import statusCode from '../../helpers/constants/status.codes';
import reactionCount from '../../helpers/commonAction/reactionCount';
import createCommentReaction from '../../helpers/commonAction/createCommentReaction';

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
    await createCommentReaction(req, res, statusCode.CREATED, 'You have successfully  liked this comment', 'like');
  }

  /**
   * @description - Users should be able to dislike a comment
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static async dislikeComment(req, res) {
    await createCommentReaction(req, res, statusCode.CREATED, 'You have successfully  disliked this comment', 'dislike');
  }

  /**
   * @description - Users should be able to count numbers of likes
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static getLikeCount(req, res) {
    reactionCount(req, res, statusCode.OK, 'likeCount');
  }

  /**
   * @description - Users should be able to count numbers of dislikes
   * @param {Object} req - Request Object
   * @param {Object} res  - Response Object
   * @returns {Object} - Response object
   */
  static getDislikeCount(req, res) {
    reactionCount(req, res, statusCode.OK, 'disLikeCount');
  }
}
