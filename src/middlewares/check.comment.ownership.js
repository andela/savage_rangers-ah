import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';
import errorMessages from '../helpers/constants/error.messages';
import sendError from '../helpers/error.sender';

const { Comment } = models;

/**
 *  A middleware to check if a user is an owner of a comment.
 *
 * @author Prémices
 * @static
 * @param {object} req the request
 * @param {object} res the response to be sent
 * @param { object } next the next route controller to be called
 * @memberof CheckUserOwnership
 * @returns {Object} res
 */
export default async (req, res, next) => {
  const { id: author } = req.user.user;

  const response = await Comment.findOne({
    where: {
      userId: author
    }
  });

  if (response) {
    next();
  } else {
    sendError(statusCode.ACCESS_DENIED, res, 'userId', errorMessages.notCommentOwner);
  }
};
