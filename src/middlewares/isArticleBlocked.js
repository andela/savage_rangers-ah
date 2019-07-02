import models from '../api/models';
import checkBlockeStatus from '../helpers/commonAction/checkBlockedStatus';

const { Article } = models;
/**
 * @description checks if an article is blocked or not.
 * @export
 * @class checkIfBlocked
 */
export default class checkIfBlocked {
  /**
   * @description This middleware will check if the article is blocked
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkArticle
   * @returns {Object} res
   */
  static async checkBlocked(req, res, next) {
    checkBlockeStatus(req, res, next, false, Article);
  }

  /**
   * @description This function checks if the article is unblocked
   * @static
   * @param {object} req the request
   * @param {object} res the response
   * @param { object } next the next route controller to be called
   * @memberof checkArticle
   * @returns {Object} res
   */
  static async checkUnBlocked(req, res, next) {
    checkBlockeStatus(req, res, next, true, Article);
  }
}
