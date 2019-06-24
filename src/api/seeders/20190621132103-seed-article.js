export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [{
    content: 'John Doe',
    createdAt: '2019-06-21 15:18:40.907+02',
    updatedAt: '2019-06-21 15:18:40.907+02'
  }], {}),

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
