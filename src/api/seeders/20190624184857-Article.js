export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles',
    [
      {
        id: 'e6db9e0b-ebdf-468a-9e66-db314b7586c0',
        title: 'How to create sequalize seedss',
        slug: 'How-to-create-sequalize-seedss',
        description: 'How to set dummy data automaticallyy',
        body: 'Suppose we want to insert some dataa.',
        coverImage: 'default.jpeg',
        category: 'Tech',
        userId: 1,
        tagList: ['postgres', 'express', 'sequelize'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '263920cd-c7ad-45b0-a5d9-d12f7fe237c3',
        title: 'What is a Version 1 UUID',
        slug: 'What-is-a-Version-1-UUID',
        description: 'Velit non sit culpa pariatur proident',
        body: 'A Version 1 UUID is a universall',
        coverImage: 'default.jpeg',
        category: 'Tech',
        userId: 1,
        tagList: ['UUID', 'express', 'sequelize'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e6db9e0b-ebdf-468a-9e66-db314b7586c2',
        title: 'How to create sequalize seeds',
        slug: 'How-to-create-sequalize-seeds',
        description: 'How to set dummy data automatically',
        body: 'Suppose we want to insert some data.',
        coverImage: 'default.jpeg',
        category: 'Tech',
        userId: 1,
        tagList: ['postgres', 'express', 'sequelize'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
