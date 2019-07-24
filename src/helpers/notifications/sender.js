import models from '../../api/models';
import getUserConfig from './get.user.config';
import sendMail from '../Mailer';

const { Notification } = models;

/**
 * @param {object} resource - The resource on which events are listened and notifications
 * should be sent
 * @param {object} action - The action whose event has been emitted
 * @param {object} user
 * @param {object} message
 * @param {object} url
 * @returns {object} notification
 */
export default async (resource, action, user, message, url) => {
  // Initializing variables
  let inAppNotification = {};
  let emailNotification = {};

  // getting the preferences of the user
  const userConfig = await getUserConfig(user.dataValues.id);

  // sending notifications
  // In app
  if (userConfig.success) {
    const { inApp, email } = userConfig.config;

    if (inApp[resource].show && inApp[resource].on.includes(action)) {
      inAppNotification = await Notification.create({
        userId: user.id,
        message: message.inAppMessage,
        url,
        type: 'inApp'
      });

      inAppNotification = inAppNotification.get();
    }

    // Email
    if (user.email && email[resource].show && email[resource].on.includes(action)) {
      emailNotification = await Notification.create({
        userId: user.id,
        message: message.inAppMessage,
        url,
        type: 'email'
      });

      emailNotification = emailNotification.get();

      await sendMail('Notification', `${resource} on ${action}`, user.email, 'notifications', {
        message: message.emailMessage,
        url,
        userName: user.username,
        buttonText: message.emailButtonText
      });
    }
  } else process.stdout.write(`Oops! no configurations for ${user.dataValues.username}`);

  return { inAppNotification, emailNotification };
};
