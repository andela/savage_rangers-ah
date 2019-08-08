import Sequelize from 'sequelize';
import models from '../models';
import statusCodes from '../../helpers/constants/status.codes';
import errorMessage from '../../helpers/constants/error.messages';
import articleValidator from '../../helpers/validators/articleValidator';
import errorSender from '../../helpers/error.sender';
import generatePagination from '../../helpers/generate.pagination.details';
import createTags from '../../helpers/create.article.tags';
import generateReadtime from '../../helpers/read.time.estimator';
import commonQueries from '../../helpers/commonAction/commonQueries';
import getArticleResult from '../../helpers/commonAction/getArticleResult';
import getSingleArticleLogic from '../../helpers/commonAction/getSingleArticleLogic';
import updateArticle from '../../helpers/commonAction/updateArticle';

const {
  Article, Category, User, ArticleTag
} = models;

const { CREATED, BAD_REQUEST, OK } = statusCodes;

const minimumLimit = 0;

const userAttributes = ['username', 'firstName', 'lastName', 'profileImage'];
// models to inlude while fecthing article
const articleInclude = [
  {
    model: Category,
    as: 'Category',
    attributes: ['name']
  },
  {
    model: User,
    attributes: userAttributes
  }
];
// pagination constant
const defaultLimit = 10;
const defaultOffset = 0;
const result = {};
let query = {};

/**
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
    let articleTags;

    const articleValidInput = await articleValidator(req.body);
    const readTime = generateReadtime(req.body.body);
    const { category, coverImage } = req.body;
    const article = await Article.create({
      ...articleValidInput,
      slug: '',
      author,
      category,
      coverImage,
      readTime
    });
    if (article) {
      req.article = article.get();
      if (req.body.tags) {
        articleTags = await createTags(req);
      }
      return res.status(CREATED).json({
        message: errorMessage.articleCreate,
        article: article.get(),
        tags: articleTags
      });
    }
  }

  /**
   * publish a drafted article
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async publish(req, res) {
    const { slug } = req.params;
    query = commonQueries.publish;
    query.slug = slug;
    const article = await Article.update({
      status: 'published'
    },
    {
      where: { ...query }
    });
    const published = 1;
    if (article[0] === published) {
      res.status(OK).json({
        message: 'Your article has been published successfully'
      });
    } else {
      errorSender(BAD_REQUEST, res, 'Properties', errorMessage.missingProperty);
    }
  }

  /**
   * This function gets user's drafted articles
   *
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof Articles
   * @returns {Object} res
   */
  static async getDraftedArticles(req, res) {
    const { id } = req.user.user;
    const limit = req.query.limit || defaultLimit;
    const offset = req.query.offset || defaultOffset;
    const articles = await Article.findAndCountAll({
      offset,
      limit,
      include: articleInclude,
      where: {
        status: 'draft',
        author: id
      }
    });

    result.status = OK;
    result.pagedArticles = generatePagination(articles.count,
      articles.rows,
      offset,
      limit);
    result.Articles = articles.rows;

    getArticleResult(articles.rows.length, res, statusCodes, result);
  }

  /**
   * A method to delete a single article
   *
   * @static
   * @param {Object} req - request object
   * @param {Object} res - respond object
   * @returns {Object} response body
   * @memberof ArticleController
   */
  static async delete(req, res) {
    const { slug } = req.params;
    await ArticleTag.destroy({ where: { articleId: req.article.id } });
    await Article.destroy({ where: { slug } });
    res.status(statusCodes.OK).json({
      status: statusCodes.OK,
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
    const limit = req.query.limit || defaultLimit;
    const offset = req.query.offset || defaultOffset;
    const articles = await Article.findAndCountAll({
      offset,
      limit,
      include: articleInclude,
      where: {
        status: {
          [Sequelize.Op.ne]: 'draft'
        }
      }
    });

    result.status = 200;
    result.pagedArticles = generatePagination(articles.count,
      articles.rows,
      offset,
      limit);
    result.Articles = articles.rows;
    getArticleResult(articles.rows.length, res, statusCodes, result);
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
    query = commonQueries.getSingleArticle;
    query.slug = slug;
    const article = await Article.findOne({
      where: { ...query },
      include: articleInclude
    });

    getSingleArticleLogic(req, res, article, statusCodes);
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
      title, description, body, category, coverImage
    } = req.body;
    const updateContent = {
      title: title || req.Existing.title,
      description: description || req.Existing.description,
      body: body || req.Existing.body,
      category: category || req.Existing.category,
      coverImage: coverImage || req.Existing.coverImage
    };
    await ArticleTag.destroy({ where: { articleId: req.article.id } });
    const readTime = generateReadtime(updateContent.body);
    updateContent.readTime = readTime;

    await updateArticle(Article, updateContent, slug);

    await createTags(req);
    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: 'Your Article is up-to-date now, Thanks'
    });
  }

  /**
   * This function gets all articles that belongs to a specific category
   *
   * @static
   * @param {Object} req the request
   * @param {Object} res the response to be sent
   * @memberof Articles
   * @returns {Object} res
   */
  static async getArticlesByCategory(req, res) {
    const { categoryId } = req.params;
    const { offset, limit } = req.query;
    const articles = await Article.findAndCountAll({
      where: {
        category: categoryId
      },
      offset,
      limit
    });
    if (articles.rows.length === minimumLimit) {
      return res.status(statusCodes.NOT_FOUND).json({
        status: statusCodes.NOT_FOUND,
        message: `Article with category: ${categoryId} not found`
      });
    }

    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      paginationDetails: generatePagination(articles.count,
        articles.rows,
        offset,
        limit),
      data: articles.rows
    });
  }
}
