import _ from 'lodash';
import Sequelize from 'sequelize';
import models from '../models/index';
import status from '../../helpers/constants/status.codes';
import sendError from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';
import generatePaginationDetails from '../../helpers/generate.pagination.details';

const { Tag, ArticleTag, Article } = models;

/**
 *
 * @export
 * @class articleTags
 */
export default class articleTags {
  /**
   * A method to get all tags of an article
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Object} res
   */
  static async getArticleTags(req, res) {
    // Initializing variables
    const result = {};
    const { slug } = req.params;

    // Getting the tags
    const currentTags = await Tag.findAll({
      include: {
        model: Article,
        attributes: [],
        required: true,
        through: {
          model: ArticleTag
        },
        where: {
          slug
        }
      }
    });

    // sending the result back
    if (_.isEmpty(currentTags)) {
      sendError(status.NOT_FOUND, res, 'tags', errorMessages.emptyTagList);
    } else {
      result.status = status.OK;
      result.data = currentTags;
      res.status(status.OK).json(result);
    }
  }

  /**
   * A method to query the tags table
   * by the name content
   *
   * @param {Object} req - the request object
   * @param {Object} res - the result object
   * @returns {Object} res
   */
  static async getTagsByQuery(req, res) {
    // Initializing variables
    const result = {};
    const { offset, limit } = req.query;
    const firstIndex = 0;
    let querySubstring = req.query.tagNameContent;

    querySubstring = querySubstring.charAt(firstIndex).toUpperCase()
      + querySubstring.slice(1).toLowerCase();
    // Getting the tags
    const currentTags = await Tag.findAndCountAll({
      where: {
        name: {
          [Sequelize.Op.substring]: querySubstring
        }
      },
      offset,
      limit
    });

    // sending the result back
    if (_.isEmpty(currentTags.rows)) {
      sendError(status.NOT_FOUND,
        res,
        'tags',
        `${errorMessages.emptyTagList} or ${
          errorMessages.noTagFoundWithEntries
        }`);
    } else {
      result.status = status.OK;
      // Generating pagination details
      result.paginationDetails = generatePaginationDetails(currentTags.count,
        currentTags.rows,
        offset,
        limit);
      result.data = currentTags.rows;
      res.status(status.OK).json(result);
    }
  }

  /**
   * @memberof articleTags
   * @param {*} req sent by the user
   * @param {*} res sent back to the user
   * @return {*} void
   */
  static async getAllTags(req, res) {
    const allTags = await Tag.findAll();

    res.status(status.OK).json({
      status: status.OK,
      tags: allTags
    });
  }
}
