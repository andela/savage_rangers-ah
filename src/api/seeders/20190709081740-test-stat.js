export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reads', [
      {
        articleSlug: 'How-to-create-sequalize-seeds',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        articleSlug: 'How-to-create-sequalize-seeds',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reads', null, {});
  }
};
