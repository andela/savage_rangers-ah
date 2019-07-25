import status from '../helpers/constants/status.codes';
import errorMessage from '../helpers/constants/error.messages';
import sendError from '../helpers/error.sender';

/**
 * @export
 * @class
 */
export default class CommentComparison {
  /**
     * @author Daniel Mwangila
     * @description This function
     * compares the updated comment with what is already stored on the database.
     * @success It will continue to the controller.
     * @failure It will respond with apropriate message indicating the that the user hasn't
     *  modified anything.
     * @param {Object} req Request sent by the user.
     * @param {Object} res Response sent back to the user if the request ends  here.
     * @param {*} next If the request has no issues it will allow the process to continue.
     * @returns {*} Void
     * @memberof CommentComparison
     */
  static async compare(req, res, next) {
    const storedComments = req.comment;
    const { body } = req.body;

    if (storedComments.body === body) {
      sendError(status.BAD_REQUEST, res, 'comment', errorMessage.notModifiedComment);
    } else {
      const newComment = {};
      newComment.body = body;
      newComment.iteration = storedComments.iteration + 1;
      newComment.isEdited = true;

      req.newComment = newComment;

      next();
    }
  }
}
