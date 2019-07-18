import models from '../../models';
import status from '../../../helpers/constants/status.codes';
import paginateUser from '../../../helpers/generate.pagination.details';

const generatePagination = paginateUser;

const {
  Comment, ReportedComment, User, Reason
} = models;

/**
 * contains all method for an admin to read/delete/Block/unblock a comment
 *
 * @export
 * @class AdminReportedCommentController
 */
class AdminReportedCommentController {
  /**
   * This function gets all the reported comment that are stored in the database
   *
   * @author Frank Mutabazi
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof AdminReportedCommentController
   * @returns {Object} res
   */
  static async getAllReportedComments(req, res) {
    const defaultOffset = 0;
    const defaultLimit = 10;
    const offset = req.query.offset || defaultOffset;
    const limit = req.query.limit || defaultLimit;
    const result = await ReportedComment.findAll({
      attributes: ['createdAt'],
      include: [
        {
          model: Comment,
          required: true,
          attributes: ['id', 'body', 'articleSlug']
        },
        {
          model: User,
          required: true,
          attributes: ['username', 'email']
        },
        {
          model: Reason,
          required: true,
          attributes: ['description']
        }
      ],
      offset,
      limit
    });
    return res.status(status.OK).send({
      status: status.OK,
      paginationDetails: generatePagination(result.length, result, offset, limit),
      data: result
    });
  }

  /**
   * fetch all reported Comments on a single comment
   *
   * @author Frank Mutabazi
   * @static
   * @param {object} req - request object
   * @param {object} res - respond object
   * @returns {array} response body
   * @memberof AdminReportedCommentController
   */
  static async singleReportedComment(req, res) {
    const { id } = req.params;
    const response = await Comment.findOne({
      where: {
        id
      },
      attributes: ['id', 'body', 'userId', 'articleSlug'],
      include: [
        {
          model: Reason,
          required: true,
          attributes: ['id', 'description'],
          through: {
            model: ReportedComment,
            attributes: ['userId']
          }
        }
      ]
    });

    return response
      ? res.status(status.OK).send({
        status: status.OK,
        data: response
      })
      : res.status(status.OK).send({
        status: status.OK,
        message: 'No reports for this comment.'
      });
  }

  /**
   * block Comment
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof commentReportController
   */
  static async blockComment(req, res) {
    const { id } = req.params;
    const { body } = req;
    const isBlocked = true;

    await Comment.update({
      isBlocked
    },
    {
      where: {
        id
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: `${body}:: blocked successfully`,
      data: {
        body
      }
    });
  }

  /**
   * unblock Comment
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof commentReportController
   */
  static async unBlockComment(req, res) {
    const { id } = req.params;
    const isBlocked = false;
    const { body } = req;
    await Comment.update({
      isBlocked
    },
    {
      where: {
        id
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: `${body}:: unblocked successfully`,
      data: {
        body
      }
    });
  }
}

export default AdminReportedCommentController;
