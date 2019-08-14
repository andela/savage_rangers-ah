
import { sequelize } from '../models';
import status from '../../helpers/constants/status.codes';

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
    const resp = await sequelize.query(`SELECT a.title, a.slug, a.description, a."createdAt", a."coverImage", a."readTime", COUNT(r."articleSlug") slug_count, c.name category, u."firstName", u."lastName", u.username, u."profileImage"
    FROM "Articles" a
    INNER JOIN "Reads" r ON r."articleSlug" = a.slug
    LEFT JOIN "Categories" c ON c.id = a.category
    INNER JOIN "Users" u ON u.id = a.author
    GROUP BY a.title, a.slug,  a.description,  a."coverImage", c.name, a."createdAt", u."firstName", u."lastName", u.username, a."readTime", u."profileImage"
    ORDER BY slug_count DESC
    LIMIT 4;`);

    res.status(status.OK).send({
      status: status.OK,
      data: resp[0]
    });
  }
}
