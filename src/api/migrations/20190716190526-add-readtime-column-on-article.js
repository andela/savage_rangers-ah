export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'readTime', {
    type: Sequelize.FLOAT,
    allowNull: false
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Articles', 'readTime')
};
