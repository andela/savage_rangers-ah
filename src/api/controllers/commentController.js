import _ from 'lodash';
import Sequelize from 'sequelize';
import status from '../../helpers/constants/status.codes';
import models from '../models';
import sendError from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';
import generatePaginationDetails from '../../helpers/generate.pagination.details';

const { Comment, User } = models;

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
    // Initializing variables
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
      include: [
        {
          model: User,
          required: true,
          attributes: ['username', 'bio', 'profileImage']
        },
        {
          model: Comment,
          as: 'Replies'
        }
      ],
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
   * A method to update a single comment
   *
   * @author Prémices
   * @static
   * @param {object} req - this is the request object
   * @param {object} res - this is the response object
   * @returns {object} - this function returns an object
   * @memberof commentController
   */
  static async updateComment(req, res) {
    // Initializing variables
    const { slug, id } = req.params;

    await Comment.update({
      body: req.body.body
    },
    {
      where: {
        id,
        articleSlug: slug
      }
    });

    res.status(status.OK).json({
      status: status.OK,
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
