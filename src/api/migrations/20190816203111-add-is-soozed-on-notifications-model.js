export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('NotificationConfigs', 'isSnoozed', {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }),

  down: queryInterface => queryInterface.removeColumn('NotificationConfigs', 'isSnoozed')
};
