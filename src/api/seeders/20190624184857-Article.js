export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles',
    [
      {
        title: 'How to create sequalize seeds',
        slug: 'How-to-create-sequalize-seeds',
        description: 'How to set dummy data automatically',
        body:
            "Suppose we want to insert some data into a few tables by default. If we follow up on previous example we can consider creating a demo user for User table.To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database table with sample data or test data.Let's create a seed file which will add a demo user to our User table.",
        coverImage: 'default.jpeg',
        tagList: ['postgres', 'express', 'sequelize'],
        category: 1,
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'How to create sequalize seedss',
        slug: 'How-to-create-sequalize-seedss',
        description: 'How to set dummy data automaticallyy',
        body: 'Suppose we want to insert some dataa.',
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
        body:
            'A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the MAC address of the computer on which it was generated.',
        coverImage: 'default.jpeg',
        tagList: ['UUID', 'express', 'sequelize'],
        category: 1,
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};