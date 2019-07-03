export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Articles', ['slug'], {
    type: 'unique',
    name: 'add-unique-const'
  }),
  down: queryInterface => queryInterface.removeConstraint('Articles', 'add-unique-const')
};
