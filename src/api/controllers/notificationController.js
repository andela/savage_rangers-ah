import _ from 'lodash';
import models from '../models';
import status from '../../helpers/constants/status.codes';
import sendError from '../../helpers/error.sender';
import errorMessages from '../../helpers/constants/error.messages';
import emailUnsubscriptionConfig from '../../helpers/constants/email.unsubscription.config.json';

const { NotificationConfig, Notification } = models;

/**
 * A function to send the result back for notifications GET requests
 *
 * @param {Object} Notifications - The sequelize return value
 * @param {Object} ResultObject - The result object
 * @param {Object} Res -  The express result object
 * @returns {Object} result - The result object
 */
const sendNotificationResult = (Notifications, ResultObject, Res) => {
  if (!_.isEmpty(Notifications)) {
    // Sending the result
    ResultObject.status = status.OK;
    ResultObject.data = Notifications;
    return Res.status(status.OK).json(ResultObject);
  }
  return sendError(status.NOT_FOUND, Res, 'notifications', errorMessages.notificationNotFound);
};

/**
 * A class to handle all notifications
 */
export default class NotificationController {
  /**
   * A method to get user configs
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing set configuration
   */
  static async getConfig(req, res) {
    // Initializing variables
    const result = {};
    const {
      user: { id }
    } = req.user;

    const userConfig = await NotificationConfig.findOne({
      userId: id
    });

    userConfig.config = JSON.parse(userConfig.config);

    // Sending the result
    result.status = status.OK;
    result.config = userConfig;
    return res.status(status.OK).json(result);
  }

  /**
   * A method to update user configs
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing set configuration
   */
  static async updateConfig(req, res) {
    // Initializing variables
    const result = {};
    const { user: { id } } = req.user;
    const isUnsubscribeRequest = req.url.includes('email');
    // Updating the configuration
    if (isUnsubscribeRequest) {
      await NotificationConfig.update({
        config: JSON.stringify(emailUnsubscriptionConfig)
      },
      { where: { userId: id } });
    } else {
      await NotificationConfig.update({
        config: JSON.stringify(req.body)
      },
      { where: { userId: id } });
    }
    // sending the result back
    result.status = status.OK;
    result.message = 'Configurations updated successfully';
    return res.status(status.OK).json({ result });
  }

  /**
   * A method to get all seen/unseen notifications of a user
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing all notifications
   */
  static async getSeenUnseen(req, res) {
    // Initializing variables
    const result = {};
    const {
      user: { id }
    } = req.user;
    const isUnseenRequest = req.url.includes('unseen');
    let notifications;

    if (isUnseenRequest) {
      notifications = await Notification.findAll({
        where: {
          userId: id,
          status: 'unseen'
        }
      });
    } else {
      notifications = await Notification.findAll({
        where: {
          userId: id,
          status: 'seen'
        }
      });
    }
    sendNotificationResult(notifications, result, res);
  }

  /**
   * A method to get all notifications of a user
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing all notifications
   */
  static async getAll(req, res) {
    // Initializing variables
    const result = {};
    const {
      user: { id }
    } = req.user;

    const notifications = await Notification.findAll({
      where: {
        userId: id
      }
    });
    sendNotificationResult(notifications, result, res);
  }

  /**
   * A method to update a single notification
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object
   */
  static async updateNotification(req, res) {
    const result = {};
    const { user: { id: userId } } = req.user;
    const { id } = req.params;
    const isUnseenRequest = req.url.includes('unseen');
    if (isUnseenRequest) {
      await Notification.update({
        status: 'unseen'
      },
      { where: { id, userId } });
    } else {
      await Notification.update({
        status: 'seen'
      },
      { where: { id, userId } });
    }
    result.status = status.OK;
    result.message = 'Notification updated successfully';
    return res.status(status.OK).json(result);
  }
}
