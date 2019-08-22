import models from '../models';
import status from '../../helpers/constants/status.codes';

const { Category } = models;
/**
 * @class
 */
export default class CategoryController {
  /**
     * @memberof categoryController
     * @static
     * @param {*} req request from the user
     * @param {*} res response after processing
     * @returns {*} void
     */
  static async getCategory(req, res) {
    const categories = await Category.findAll();

    res.status(status.OK).json({
      status: status.OK,
      categories
    });
  }
}
