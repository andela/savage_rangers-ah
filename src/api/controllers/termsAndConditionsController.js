import statusCode from '../../helpers/constants/status.codes';
import models from '../models';
import errorSender from '../../helpers/error.sender';

const { TermsAndConditions } = models;

/**
 * @class TermsAndConditionController
 * @description a class to get or update terms and conditions of Authors haven
 */
export default class TermsAndConditionController {
  /**
   * a controller to get and update terms and conditions
   * @param {Object} req - Request
   * @param {Object} res  - Response
   * @returns {Object} The response object
   */
  static async getTermsAndConditions(req, res) {
    const termsDocument = await TermsAndConditions.findOne({
      where: {
        id: req.params.id
      }
    });
    return res.status(statusCode.OK).json({
      status: statusCode.OK,
      termsDocument
    });
  }

  /**
   *
   * @param {Object} req - Request
   * @param {Object} res  - Response
   * @returns {Object} The response object
   */
  static async updateTermsAndConditions(req, res) {
    const updatedTerms = req.body.termsAndConditions;
    const termsDocument = await TermsAndConditions.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!termsDocument) {
      return errorSender(statusCode.NOT_FOUND,
        res,
        'terms and conditions',
        'terms and conditions not found');
    }

    await TermsAndConditions.update({ termsAndConditions: updatedTerms },
      { where: { id: req.params.id } });
    return res.status(statusCode.OK).json({
      status: statusCode.OK,
      message: 'updated successfully'
    });
  }
}
