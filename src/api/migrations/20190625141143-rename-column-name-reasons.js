export default {
  up: (queryInterface, Sequelize) => queryInterface.renameColumn('Reasons', 'name', 'description'),
  down: (queryInterface, Sequelize) => queryInterface.createTable('Reasons'),
};
