import models from '../../api/models';

const { NotificationConfig } = models;

/**
 * A helper to get all notification configs of a user
 * @param {integer} userId
 * @returns {object} the config token
 */
export default async (userId) => {
  const resultObject = {};
  let userConfig;

  try {
    userConfig = await NotificationConfig.findOne({
      where: { userId }
    });

    resultObject.success = true;
    resultObject.config = JSON.parse(userConfig.dataValues.config);
    return resultObject;
  } catch (error) {
    resultObject.success = false;
    return resultObject;
  }
};
