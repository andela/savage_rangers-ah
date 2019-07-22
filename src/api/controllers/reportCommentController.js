import models from '../models';
import status from '../../helpers/constants/status.codes';
import errorSender from '../../helpers/error.sender';

const { ReportedComment } = models;

/**
 * contains a report comment controller
 * @export
 * @class CommentReactionController
 */
class CommentReactionController {
  /**
   * report an inappropriate comment
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof CommentReactionController
   * @returns {Object} res
   */
  static async reportComment(req, res) {
    const commentId = req.params.id;
    const { commentReason } = req.body;
    const {
      user: { id }
    } = req.user;
    try {
      const result = await ReportedComment.findOrCreate({
        where: {
          userId: id,
          reportedCommentId: commentId,
          reasonId: commentReason
        }
      });

      return result[0]._options.isNewRecord === false
        ? errorSender(status.BAD_REQUEST,
          res,
          'Message',
          'Sorry, You can not report this comment twice with the same comment reason, Thanks ')
        : res.status(status.CREATED).json({
          status: status.CREATED,
          message: 'Reported Successfully'
        });
    } catch (SequelizeForeignKeyConstraintError) {
      errorSender(status.NOT_FOUND,
        res,
        'Message',
        'Sorry, but that reason does not exist, Thanks');
    }
  }
}

export default CommentReactionController;
