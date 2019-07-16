export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'isBlocked', {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }),

  down: queryInterface => queryInterface.removeColumn('Articles', 'isBlocked')
};
