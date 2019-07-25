import models from '../../models';
import status from '../../../helpers/constants/status.codes';
import paginateUser from '../../../helpers/generate.pagination.details';
import blockUnblockUser from '../../../helpers/commonAction/blockUnblockUser';
import fetchReportedArticle from '../../../helpers/commonAction/fetchReportedFiles';
import blockUnblockArticles from '../../../helpers/commonAction/blockUnblockArticle';
import ReportQuery from '../../../helpers/commonAction/commonQueries';
import moderatorActions from '../../../helpers/commonAction/adminModerator';

const generatePagination = paginateUser;
const defaultLimit = 10;
const defaultOffset = 0;

const {
  Report, User
} = models;
/**
 * containing all user's model controllers (signup, login)
 *
 * @export
 * @class Auth
 */
export default class adminPermissions {
  /**
   * This function gets all the users that are stored in the User table
   *
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof users
   * @returns {Object} res
   */
  static async getUsers(req, res) {
    // default constants
    const result = {};
    const emptyUserArray = 0;

    const limit = req.query.limit || defaultLimit;
    const offset = req.query.offset || defaultOffset;
    const users = await User.findAndCountAll({
      offset,
      limit
    });

    result.status = status.OK;
    result.pagedUsers = paginateUser(users.count, users.rows, offset, limit);
    result.users = users.rows;
    if (users.rows.length > emptyUserArray) {
      res.status(status.OK).json({
        status: status.OK,
        result
      });
    } else {
      res.status(status.NOT_FOUND).json({
        status: status.NOT_FOUND,
        message: 'There are no more users at the moment.'
      });
    }
  }

  /**
   * Update User
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async updateUser(req, res) {
    const { email } = req.params;
    const { firstName, lastName } = req.body;

    await User.update({
      email,
      firstName,
      lastName
    },
    {
      where: {
        email
      }
    });
    return res.status(status.OK).json({
      status: status.OK,
      message: 'user updated successufully',
      data: {
        firstName,
        lastName,
        email
      }
    });
  }

  /**
   * make User a moderator
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async makeModerator(req, res) {
    await moderatorActions(req, res, status.OK, 'moderator', 'is now a moderator');
  }

  /**
   * remove  User from moderator role
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async removeModerator(req, res) {
    await moderatorActions(req, res, status.OK, 'normal', 'is no longer a moderator');
  }

  /**
   * block a user
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async blockUser(req, res) {
    await blockUnblockUser(req, res, true, 'blocked successfully');
  }

  /**
   * unblock User
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof Auth
   */
  static async unBlockUser(req, res) {
    await blockUnblockUser(req, res, false, 'unblocked successfully');
  }

  /**
   * fetch all reported Articles
   *
   * @static
   * @param {array} req - request array
   * @param {array} res - respond array
   * @returns {array} response body
   * @memberof getArticles
   */
  static async getReportedArticles(req, res) {
    const offset = req.query.offset || defaultOffset;
    const limit = req.query.limit || defaultLimit;
    const paginatedArticle = await fetchReportedArticle(offset, limit);
    res.status(status.OK).send({
      status: status.OK,
      paginationDetails: generatePagination(paginatedArticle.length,
        paginatedArticle,
        offset,
        limit),
      data: paginatedArticle
    });
  }

  /**
   * fetch single reported Article
   *
   * @static
   * @param {array} req - request array
   * @param {array} res - respond array
   * @returns {array} response body
   * @memberof getArticles
   */
  static async getReportedArticle(req, res) {
    const { slug } = req.params;
    const reportedArticle = await Report.findOne({
      attributes: ['createdAt'],
      where: {
        reportedArticleSlug: slug
      },
      include: ReportQuery.reportArticleJoin
    });
    res.status(status.OK).send({
      status: status.OK,
      data: reportedArticle
    });
  }

  /**
   * block Article
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof blockArticle
   */
  static async blockArticle(req, res) {
    await blockUnblockArticles(req, res, true, 'blocked successfully');
  }

  /**
   * unblock Article
   *
   * @static
   * @param {object} req - request body
   * @param {object} res - response body
   * @returns { object } - response
   * @memberof blockArticle
   */
  static async unBlockArticle(req, res) {
    await blockUnblockArticles(req, res, false, 'unblocked successfully');
  }
}
