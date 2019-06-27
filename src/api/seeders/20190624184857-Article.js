export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles',
    [
      {
        title: 'How to create sequalize seeds',
        slug: 'How-to-create-sequalize-seeds',
        description: 'How to set dummy data automatically',
        body: 'Suppose we want to insert some data.',
        coverImage: 'default.jpeg',
        category: 1,
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'What is a Version 1 UUID',
        slug: 'What-is-a-Version-1-UUID',
        description: 'Velit non sit culpa pariatur proident',
        body: 'A Version 1 UUID is a universall',
        coverImage: 'default.jpeg',
        category: 1,
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
