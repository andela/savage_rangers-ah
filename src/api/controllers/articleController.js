import cloudinary from 'cloudinary';
import models from '../models';
import statusCodes from '../../helpers/constants/status.codes';
import errorMessage from '../../helpers/constants/error.messages';
import articleValidator from '../../helpers/validators/articleValidator';
import errorSender from '../../helpers/error.sender';
import generatePagination from '../../helpers/generate.pagination.details';

const { Article, Category, User } = models;
const { CREATED } = statusCodes;

/**
 *
 *
 * this is the article controller
 *
 * @export
 * @class ArticleController
 */

/**
 * containing all article's model controllers
 * @export
 * @class ArticleController
 */
export default class ArticleController {
  /**
   * register a new
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async create(req, res) {
    const { id: author } = req.user.user;

    const articleValidInput = await articleValidator(req.body);
    const { category: id } = req.body;
    let coverImage;
    if (req.file) {
      const savedFile = await cloudinary.v2.uploader.upload(req.file.path);
      coverImage = savedFile.secure_url;
    }
    const getCategory = await Category.findOne({ where: { id } });
    const { id: category } = getCategory.dataValues;
    const article = await Article.create({
      ...articleValidInput,
      slug: '',
      author,
      category,
      coverImage
    });
    if (article) {
      return res.status(CREATED).json({
        message: errorMessage.articleCreate,
        article: article.get()
      });
    }
  }

  /**
   *
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - respond object
   * @returns {Object} response body
   * @memberof ArticleController
   */
  static async delete(req, res) {
    const { slug } = req.params;
    await Article.destroy({ where: { slug } });
    res.status(statusCodes.OK).json({
      statusCodes: res.statusCodes,
      message: 'article deleted successfully'
    });
  }

  /**
   * This function gets all the articles that are stored in the article table
   *
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof Articles
   * @returns {Object} res
   */
  static async getArticles(req, res) {
    // default constants
    const defaultLimit = 10;
    const defaultOffset = 0;
    const result = {};
    const emptyArticleArray = 0;

    const limit = req.query.limit || defaultLimit;
    const offset = req.query.offset || defaultOffset;
    const articles = await Article.findAndCountAll({
      offset,
      limit,
      attributes: ['id', 'title', 'description', 'body', 'slug', 'coverImage', 'tagList', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['name']
        }, {
          model: User,
          attributes: ['firstName', 'lastName', 'profileImage'],
        }],

    });

    result.status = 200;
    result.pagedArticles = generatePagination(articles.count, articles.rows, offset, limit);
    result.Articles = articles.rows;
    if (articles.rows.length > emptyArticleArray) {
      res.status(statusCodes.OK).json({
        result
      });
    } else {
      errorSender(statusCodes.NOT_FOUND, res, 'Articles', errorMessage.noMoreArticle);
    }
  }

  /**
   * This function gets a specific article using slug as the search keyword
   *
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof Articles
   * @returns {Object} res
   */
  static async getArticle(req, res) {
    const { slug } = req.params;
    const article = await Article.findOne({
      attributes: ['id', 'title', 'description', 'body', 'slug', 'coverImage', 'tagList', 'createdAt', 'updatedAt'],
      where: { slug },
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['name']
        }, {
          model: User,
          attributes: ['firstName', 'lastName', 'profileImage'],
        }]
    });

    if (article) {
      res.status(statusCodes.OK).json({
        status: 200,
        article
      });
    } else {
      errorSender(statusCodes.NOT_FOUND, res, 'Article', errorMessage.noArticles);
    }
  }

  /**
   * allow an author to update his/her article
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async updateArticle(req, res) {
    const { slug } = req.params;
    const {
      title, description, body, tagList, category
    } = req.body;

    let { coverImage } = req.Existing;

    if (req.file) {
      const image = await cloudinary.v2.uploader.upload(req.file.path);
      coverImage = image.secure_url;
    }
    const updateContent = {
      title: title || req.Existing.title,
      description: description || req.Existing.description,
      body: body || req.Existing.body,
      tagList: tagList || req.Existing.tagList,
      category: category || req.Existing.category
    };

    await Article.update({
      title: updateContent.title,
      description: updateContent.description,
      body: updateContent.body,
      coverImage,
      category: updateContent.category
    },
    {
      where: {
        slug
      }
    });
    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: 'Your Article is up-to-date now, Thanks'
    });
  }
}
