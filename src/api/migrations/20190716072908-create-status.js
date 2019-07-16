export default {
  up : (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Articles', 'status', {
        type: Sequelize.STRING,
        defaultValue: 'draft'
      })
    ]);
  },
  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Articles', 'status')
    ]);
  }
} 
