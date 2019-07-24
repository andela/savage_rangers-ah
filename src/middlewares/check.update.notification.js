import models from '../api/models';
import statusCode from '../helpers/constants/status.codes';
import sendError from '../helpers/error.sender';

const { Notification } = models;

/**
 * A middleware to check if a notification exists in the database.
 *
 * @author Prémices
 * @static
 * @param {object} req the request
 * @param {object} res the response to be sent
 * @param { object } next the next route controller to be called
 * @returns {Object} req, next
 */
export default async (req, res, next) => {
  // Initializing variables
  const { id } = req.params;
  const requestType = req.url.includes('unseen') ? 'unseen' : 'seen';
  const {
    user: { id: userId }
  } = req.user;

  try {
    const result = await Notification.findOne({
      where: {
        id,
        userId
      }
    });

    if (result.dataValues.status === requestType) {
      return sendError(statusCode.BAD_REQUEST,
        res,
        'id',
        `Notification with id ${id} has already status with value: ${requestType}`);
    }
    req.comment = result.dataValues;
    return next();
  } catch (error) {
    return sendError(statusCode.NOT_FOUND, res, 'id', `Notification with id ${id} is not found`);
  }
};
