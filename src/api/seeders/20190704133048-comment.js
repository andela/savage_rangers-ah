export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comments',
    [
      {
        id: 5,
        body: 'How to create sequalize seeds',
        userId: 5,
        articleSlug: 'What-is-a-Version-1-UUID',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        body: 'How to create sequalized great seeds',
        userId: 8,
        articleSlug: 'What-is-a-Version-1-UUID',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Comments', null, {})
};
