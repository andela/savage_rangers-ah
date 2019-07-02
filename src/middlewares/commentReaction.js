import didReact from '../helpers/commonAction/commentReaction';

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
    didReact(req, res, next, 'liked');
  }

  /**
   * Verify if the user has already disliked the comment
   * @param {Object} req - Request
   * @param {Object} res  - Response
   * @param {Function} next -Next
   * @returns {Object} The response object
   */
  static async disliked(req, res, next) {
    didReact(req, res, next, 'disliked');
  }
}
