

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Highlights', 'nodeId', {
    type: Sequelize.STRING,
    allowNull: true
  }),

  down: queryInterface => queryInterface.removeColumn('Highlights', 'nodeId')
};
