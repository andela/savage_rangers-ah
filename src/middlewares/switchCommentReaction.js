import hasReacted from '../helpers/commonAction/hasReacted';
/**
 * @class
 */
export default class {
  /**
     * @description checks if the user has disliked the comment.
     * @success the middleware will switch from dislike to like.
     * @failure  if the user did'nt dislike the comment the request reaches the control.
     * @param {*} req request from the user.
     * @param {*} res response given after processing request.
     * @param {*} next allows the request to continue.
     * @return {*} void
     */
  static async hasDisliked(req, res, next) {
    hasReacted(req, res, next, 'hasDisliked');
  }

  /**
     * @description checks if the user has liked the comment.
     * @success the middleware will switch from like to dislike.
     * @failure  if the user did'nt like the comment the request reaches the control.
     * @param {*} req request from the user.
     * @param {*} res response given after processing request.
     * @param {*} next allows the request to continue.
     * @return {*} void
     */
  static hasLiked(req, res, next) {
    hasReacted(req, res, next, 'hasLiked');
  }
}
