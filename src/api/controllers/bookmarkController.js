import status from '../../helpers/constants/status.codes';
import errorSender from '../../helpers/error.sender';
import errorMessage from '../../helpers/constants/error.messages';
import model from '../models/index';
import generatePagination from '../../helpers/generate.pagination.details';

const {
  Bookmark,
  User,
  Article,
  Category
} = model;
/**
 * @class
 */
export default class BookmarkController {
  /**
   * @author Daniel Mwangila
   * @description This functions stores the bookmarked articles
   * If the user request this operation for the second time it will delete the boorkmark
   * This is to create the toggle effect.
   * @static
   * @param {object} req the request sent to be excuted
   * @param {object} res the response after execution
   * @return {*} void
   * @memberof BookmarkController
   */
  static async addBookmark(req, res) {
    const { username } = req.user.user;
    const { slug } = req.params;

    try {
      await Bookmark.create({
        articleSlug: slug,
        username
      });
      res.status(status.CREATED).json({
        status: 201,
        message: 'Bookmarked successfully'
      });
    } catch (error) {
      const duplicationErrorCode = '23505';
      if (error.original.code === duplicationErrorCode) {
        await Bookmark.destroy({
          where: {
            username,
            articleSlug: slug
          }
        });
        res.status(status.OK).json({
          status: 200,
          message: 'Successfully removed bookmark'
        });
      } else {
        errorSender(status.NOT_FOUND, res, 'Slug', errorMessage.noSlug);
      }
    }
  }

  /**
   * @author Daniel Mwangila
   * @description This funcrtion gets the users  bookmarks from the database.
   * @static
   * @param {object} req the request sent to be excuted
   * @param {object} res the response after execution
   * @return {*} void
   * @memberof BookmarkController
   */
  static async getBookmarks(req, res) {
    const { username } = req.user.user;
    const emptyBookmarkList = 0;
    const defaultOffset = 0;
    const defaultLimit = 10;
    const data = {};
    const offset = req.query.offset || defaultOffset;
    const limit = req.query.limit || defaultLimit;

    const bookmarkList = await Bookmark.findAll({
      attributes: ['articleSlug'],
      where: {
        username
      },
      include: {
        model: Article,
        required: true,
        attributes: ['id', 'title', 'description'],
        include: [{
          model: User,
          required: true,
          attributes: ['firstName', 'lastName', 'profileImage']
        }, {
          model: Category,
          as: 'Category',
          attributes: ['name']
        }]
      },
      offset,
      limit
    });
    const count = bookmarkList.length;

    const paginationDetail = generatePagination(count, bookmarkList, offset, limit);
    data.paginationDetail = paginationDetail;
    data.bookmarks = bookmarkList;

    if (count > emptyBookmarkList) {
      res.status(status.OK).json({
        status: 200,
        data
      });
    } else {
      errorSender(status.NOT_FOUND, res, 'Bookmark', errorMessage.noBookmark);
    }
  }
}
