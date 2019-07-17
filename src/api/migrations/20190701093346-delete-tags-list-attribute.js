export default {
  up(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Articles', 'tagList');
  },

  down(queryInterface, Sequelize) {
    return queryInterface.addColumn('Articles', 'tagList', Sequelize.ARRAY(Sequelize.TEXT));
  }
};
