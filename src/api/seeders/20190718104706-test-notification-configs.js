import notificationsDefaultConfigs from '../../helpers/constants/default.notification.configs.json';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('NotificationConfigs',
    [
      {
        userId: 1,
        config: JSON.stringify(notificationsDefaultConfigs),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 13,
        config: JSON.stringify(notificationsDefaultConfigs),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 14,
        config: JSON.stringify(notificationsDefaultConfigs),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('NotificationConfigs', null, {})
};
