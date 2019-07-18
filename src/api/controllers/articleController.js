import cloudinary from 'cloudinary';
import Sequelize from 'sequelize';
import models from '../models';
import statusCodes from '../../helpers/constants/status.codes';
import errorMessage from '../../helpers/constants/error.messages';
import articleValidator from '../../helpers/validators/articleValidator';
import errorSender from '../../helpers/error.sender';
import generatePagination from '../../helpers/generate.pagination.details';
import number from '../../helpers/constants/numbers';
import createTags from '../../helpers/create.article.tags';
import generateReadtime from '../../helpers/read.time.estimator';

const {
  Article, Category, User, Report, Share, Highlight, Tag, ArticleTag, Read, Comment
} = models;

const {
  CREATED, BAD_REQUEST, OK, NOT_FOUND
} = statusCodes;

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
const emptyArticleArray = 0;

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
    const { category } = req.body;
    let coverImage;
    if (req.file) {
      const savedFile = await cloudinary.v2.uploader.upload(req.file.path);
      coverImage = savedFile.secure_url;
    }
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
      if (req.tags) {
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
    const article = await Article.update({
      status: 'published'
    },
    {
      where: {
        slug,
        title: {
          [Sequelize.Op.ne]: null,
        },
        body: {
          [Sequelize.Op.ne]: null,
        },
        description: {
          [Sequelize.Op.ne]: null,
        },
        category: {
          [Sequelize.Op.ne]: null,
        },
        coverImage: {
          [Sequelize.Op.ne]: null,
        },
      }
    });
    const published = 1;
    if (article[0] === published) {
      res.status(OK).json({
        message: 'Your article has been published successfully',
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
        author: id,
      }
    });

    result.status = OK;
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
          [Sequelize.Op.ne]: 'draft',
        },
      }
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
      where: {
        slug,
        status: {
          [Sequelize.Op.ne]: 'draft',
        },
      },
      include: articleInclude
    });

    if (article) {
      // count registered users
      if (req.user) {
        await Read.findOrCreate({
          where: {
            userId: req.user.id || req.user.user.id,
            articleSlug: article.slug,
          }
        });
      } else {
        // count unregistered users
        await Read.findOrCreate({
          where: {
            userAgent: req.headers['user-agent'],
            userIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            articleSlug: article.slug,
          }
        });
      }

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
      title, description, body, category
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
      category: category || req.Existing.category
    };

    await ArticleTag.destroy({ where: { articleId: req.article.id } });
    const readTime = generateReadtime(updateContent.body);

    await Article.update({
      title: updateContent.title,
      description: updateContent.description,
      body: updateContent.body,
      coverImage,
      category: updateContent.category,
      readTime
    },
    {
      where: {
        slug
      }
    });

    await createTags(req);
    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: 'Your Article is up-to-date now, Thanks'
    });
  }

  /**
   * allow an author to report a certain article as inappropriate
   *
   * @author Frank Mutabazi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async reportAnArticle(req, res) {
    const { slug } = req.params;
    const { reason } = req.body;
    const {
      user: { id }
    } = req.user;
    try {
      const response = await Report.findOrCreate({
        where: {
          userId: id,
          reportedArticleSlug: slug,
          reasonId: reason
        }
      });

      return response[0]._options.isNewRecord === false
        ? errorSender(statusCodes.BAD_REQUEST,
          res,
          'Message',
          `Sorry, You can not report this ${slug} with the same reason twice, Thanks `)
        : res.status(statusCodes.CREATED).json({
          status: statusCodes.CREATED,
          message: `Report for ${slug} is successfully submitted, Thanks`
        });
    } catch (SequelizeForeignKeyConstraintError) {
      errorSender(statusCodes.NOT_FOUND,
        res,
        'Message',
        'Sorry, but that reason does not exist, Thanks');
    }
  }

  /**
   * allow a user to highlight a text in an article
   *
   * @author Alain Burindi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async highlight(req, res) {
    const { slug } = req.params;
    const {
      startIndex, lastIndex, text, comment
    } = req.body;
    const correctLength = lastIndex - startIndex + 1;

    if (correctLength === text.length) {
      const userId = req.user.user.id;
      const highlighted = await Highlight.create({
        startIndex,
        lastIndex,
        text,
        comment,
        articleSlug: slug,
        userId
      });
      res.status(CREATED).json({
        status: CREATED,
        highlighted
      });
    } else {
      errorSender(BAD_REQUEST, res, 'text', errorMessage.textMatch);
    }
  }

  /**
   * allow an author to report a certain article as inappropriate
   *
   * @author Frank Mutabazi
   * allow a user to share an article on social media
   *
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async socialShareArticle(req, res) {
    const {
      user: { id }
    } = req.user;
    const { slug } = req.params;
    const { sharedOn } = req;
    const { title } = req;

    await Share.create({
      userId: id,
      articleSlug: slug,
      sharedOn
    });

    return res.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `${title} has been shared successfully on ${sharedOn}, Thanks`
    });
  }

  /**
   * allow a user to get highlighted text in an article
   *
   * @author Alain Burindi
   * @static
   * @param {object} req the request
   * @param {object} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async getHighlight(req, res) {
    const { slug } = req.params;
    const highlighted = await Highlight.findAll({
      where: {
        articleSlug: slug
      }
    });
    if (highlighted.length > number.ZERO) {
      res.status(OK).json({
        status: OK,
        highlighted
      });
    } else {
      errorSender(NOT_FOUND, res, 'highlited', errorMessage.noHighlight);
    }
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
      paginationDetails: generatePagination(articles.count, articles.rows, offset, limit),
      data: articles.rows
    });
  }

  /**
  *
   * search for artcile according to user's request
   *
   * @static
   * @param {*} req the request
   * @param {*} res the response to be sent
   * @memberof ArticleController
   * @returns {Object} res
   */
  static async search(req, res) {
    try {
      const {
        title, body, tag, username
      } = req.query;
      const articles = await Article.findAll({
        where: {
          [Sequelize.Op.or]: [
            title ? { title: { [Sequelize.Op.substring]: title.trim() } } : '',
            body ? { body: { [Sequelize.Op.substring]: body.trim() } } : '',
            tag ? { '$Tags.name$': { [Sequelize.Op.substring]: tag.trim() } } : '',
            username ? { '$User.username$': { [Sequelize.Op.substring]: username.trim() } } : ''
          ]
        },
        include: [
          {
            model: Tag,
            attributes: ['name'],
            required: false,
            through: {
              model: ArticleTag,
              attributes: []
            }
          },
          {
            model: User,
            attributes: userAttributes
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['name']
          }
        ],
      });
      const minArticleLength = 0;
      if (articles.length > minArticleLength) {
        return res.status(OK).send({
          status: res.statusCode,
          articles
        });
      }
      res.status(NOT_FOUND).send({
        status: res.statusCode,
        message: errorMessage.noResult
      });
    } catch (error) {
      return res.status(OK).send({
        error
      });
    }
  }

  /**
  * allow a user to get statistics of an article
  *
  * @author Alain Burindi
  * @static
  * @param {object} req the request
  * @param {object} res the response to be sent
  * @memberof ArticleController
  * @returns {Object} res
  */
  static async stats(req, res) {
    const { slug } = req.params;
    const whereClause = {
      where: {
        articleSlug: slug
      }
    };
    const reads = await Read.count({
      ...whereClause
    });
    const shares = await Share.count({
      ...whereClause
    });
    const comments = await Comment.count({
      ...whereClause
    });
    res.status(OK).json({
      status: OK,
      article: {
        slug,
        stats: {
          reads,
          shares,
          comments
        }
      }
    });
  }
}
