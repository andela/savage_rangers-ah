import _ from 'lodash';
import Sequelize from 'sequelize';
import status from '../../helpers/constants/status.codes';
import models from '../models';
import sendError from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';
import generatePaginationDetails from '../../helpers/generate.pagination.details';
import commonQueries from '../../helpers/commonAction/commonQueries';

const { Comment } = models;

/**
 *
 *
 * @class CommentController
 */
class CommentController {
  /**
   * A method to post a new comment on an article
   *
   * @author Prémices
   * @static
   * @param {object} req - this is the request object
   * @param {object} res - this is the response object
   * @returns {object} - this function returns an object
   * @memberof commentController
   */
  static async create(req, res) {
    const { slug } = req.params;
    const { body, parentCommentId } = req.body;
    let createdComment;
    const {
      user: { id }
    } = req.user;
    try {
      if (parentCommentId) {
        const parentComment = await Comment.findOne({
          where: {
            id: parentCommentId,
            parentCommentId: {
              [Sequelize.Op.not]: null
            }
          }
        });

        if (parentComment) sendError(status.NOT_ALLOWED, res, 'parentCommentId', errorMessages.parentCommentId);
        else {
          createdComment = await Comment.create({
            userId: id,
            articleSlug: slug,
            body,
            parentCommentId
          });

          // Sending the result back
          res.status(status.CREATED).json({
            status: status.CREATED,
            data: createdComment.dataValues
          });
        }
      } else {
        createdComment = await Comment.create({
          userId: id,
          articleSlug: slug,
          body
        });

        // Sending the result back
        res.status(status.CREATED).json({
          status: status.CREATED,
          data: createdComment.dataValues
        });
      }
    } catch (SequelizeForeignKeyConstraintError) {
      // Handling the existence of the comment for replies
      sendError(status.NOT_FOUND, res, 'comment', errorMessages.noComment);
    }
  }

  /**
   * A method to post a new comment on an article
   *
   * @author Prémices
   * @static
   * @param {object} req - this is the request object
   * @param {object} res - this is the response object
   * @returns {object} - this function returns an object
   * @memberof commentController
   */
  static async getComments(req, res) {
    // Initializing variables
    const { slug } = req.params;
    const { offset, limit } = req.query;

    const comments = await Comment.findAndCountAll({
      where: {
        articleSlug: slug,
        parentCommentId: null
      },
      include: commonQueries.getCommentJoin,
      offset,
      limit
    });

    if (!_.isEmpty(comments.rows)) {
      // Sending the result back
      res.status(status.OK).json({
        status: status.OK,
        paginationDetails: generatePaginationDetails(comments.count, comments.rows, offset, limit),
        data: comments.rows
      });
    } else {
      sendError(status.NOT_FOUND, res, 'comments', errorMessages.noCommentFound);
    }
  }

  /**
   * @description this method stores the updated comment
   * that  is passed by the comparison middleware.
   * @success it will respond with a success message to
   *  inform the user of successful execution of the task.
   * @author Prémices
   * @modified Daniel Charles Mwangila
   * @static
   * @param {object} req - this is the request object
   * @param {object} res - this is the response object
   * @returns {object} - this function returns an object
   * @memberof commentController
   */
  static async updateComment(req, res) {
    const { slug, id } = req.params;
    const { body, iteration, isEdited } = req.newComment;

    await Comment.update({
      body, iteration, isEdited
    },
    {
      where: {
        id,
        articleSlug: slug
      }
    });

    res.status(status.OK).json({
      status: status.OK,
      comment: body,
      iteration,
      isEdited,
      message: 'Comment updated successfully'
    });
  }

  /**
   * A method to delete a single comment
   *
   * @author Prémices
   * @static
   * @param {object} req - this is the request object
   * @param {object} res - this is the response object
   * @returns {object} - this function returns an object
   * @memberof commentController
   */
  static async deleteComment(req, res) {
    // Initializing variables
    const { slug, id } = req.params;

    await Comment.destroy({
      where: {
        id,
        articleSlug: slug
      }
    });

    res.status(status.OK).json({
      status: status.OK,
      message: 'Comment deleted successfully'
    });
  }

  /**
   * A method to get a single comment
   *
   * @author Prémices
   * @static
   * @param {object} req - this is the request object
   * @param {object} res - this is the response object
   * @returns {object} - this function returns an object
   * @memberof commentController
   */
  static async getSingleComment(req, res) {
    // Initializing variables
    const { slug, id } = req.params;

    try {
      const comment = await Comment.findOne({
        where: {
          id,
          articleSlug: slug
        }
      });

      res.status(status.OK).json({
        status: status.OK,
        data: comment
      });
    } catch (error) {
      sendError(status.NOT_FOUND, res, 'comment', errorMessages.noComment);
    }
  }
}
export default CommentController;
