module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Shares', 'userId'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Shares', 'userId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
    unique: false
  })
};
