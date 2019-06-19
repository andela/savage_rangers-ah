import models from '../models/index';
import status from '../../helpers/constants/status.codes';
import errorSender from '../../helpers/error.sender';
import sendError from '../../helpers/error.sender';
/**
 *
 *
 * @class LikeController
 */
export default class ArtcileController {
  /**
     *like an article
     *
     *@static
     * @param {Object} req the request
     * @param {Object} res the response
     * @memberof LikeController
     * @returns {Object} response
     */
  static async like(req, res) {
    try {
      const { Like } = models;
      const { userId, reaction, articleId } = req.data;
      const hasLiked = await Like.findOne({
        where: {
          reaction,
          userId,
          articleId
        }
      });
      if (!hasLiked) {
        const like = await Like.create({
          reaction,
          userId,
          articleId
        });
        return res.json(like);
      }
      sendError(status.BAD_REQUEST, res, reaction, `You are not allowed to ${reaction} twice`);
    } catch (error) {
      return res.json('error');
    }
  }

  /**
     *dislike an article
     *
     *@static
     * @param {Object} req the request
     * @param {Object} res the response
     * @memberof LikeController
     * @returns {Object} response
     */
  static async dislike(req, res) {
    res.json('work in progress');
  }
}
