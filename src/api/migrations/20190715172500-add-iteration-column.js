export default {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Comments', 'createdAt'),
      queryInterface.removeColumn('Comments', 'updatedAt'),
      queryInterface.addColumn('Comments', 'iteration', {
        type: Sequelize.INTEGER,
        defaultValue:'0'
      }),
      queryInterface.addColumn('Comments', 'isEdited', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('Comments', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: false
      }),
      queryInterface.addColumn('Comments', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments', 'iteration');
  }
};
