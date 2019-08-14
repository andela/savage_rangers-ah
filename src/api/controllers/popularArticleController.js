
import async from 'async';
import models, { sequelize } from '../models';
import status from '../../helpers/constants/status.codes';


const { Read, Article, User } = models;

/**
 * containing all user's
 * profile model controller(update, getUserProfile, read)
 * @export
 * @class ProfileController
 */
export default class PopularController {
  /**
         *
         * get 5 mostly read article in the database
         * @static
         * @param {*} req The request Object
         * @param {*} res The response Object
         * @memberof PopularController
         * @return {Object} The response Object
         */
  static async getAll(req, res) {
    let resultArray = [];
    const result = await Read.findAll({
      group: ['articleSlug'],
      attributes: ['articleSlug', [sequelize.fn('COUNT', 'articleSlug'), 'count']],
      order: [
        ['count', 'DESC']
      ],
      limit: 5
    });

    const slugs = result.map(item => item.dataValues.articleSlug);

    async.each(slugs, async (slug, callback) => {
      const article = await Article.findOne({
        where: {
          slug
        },
        include: {
          model: User,
          required: true,
          attributes: ['id', 'username', 'profileImage', 'firstName', 'lastName']

        }
      });
      resultArray = [...resultArray, article.dataValues];
      callback();
    }, (error) => {
      /*
   else statement violate style guide rules
  */
      /* istanbul ignore next */
      if (!error) {
        // sending the result back
        return res.status(status.OK).json({
          data: resultArray
        });
      }
    });
  }
}
