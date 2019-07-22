export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Comments', 'isBlocked', {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }),

  down: queryInterface => queryInterface.removeColumn('Comments', 'isBlocked')
};
