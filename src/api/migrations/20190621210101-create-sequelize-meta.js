export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SequelizeMeta', {
    name: {
      type: Sequelize.STRING
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('SequelizeMeta')
};
