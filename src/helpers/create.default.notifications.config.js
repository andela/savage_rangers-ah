/**
 * A helper to create default notification configurations when a user
 * is signed up
 * @name defaultNotificationConfigs
 * @author Prémices
 */

import models from '../api/models';
import defaultNotificationConfigs from './constants/default.notification.configs.json';

const { NotificationConfig } = models;

export default (id) => {
  // Inserting the default configurations into the database
  const config = NotificationConfig.create({
    userId: id,
    config: JSON.stringify(defaultNotificationConfigs)
  });

  return config.get();
};
