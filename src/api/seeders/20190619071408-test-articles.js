/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('articles', [{
    id: 'e6db9e0b-ebdf-468a-9e66-db314b7586c0',
    title: 'How to create sequalize seeds',
    slug: 'How-to-create-sequalize-seeds',
    description: 'How to set dummy data automatically',
    body: 'Suppose we want to insert some data into a few tables by default. If we follow up on previous example we can consider creating a demo user for User table.To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database table with sample data or test data.Let\'s create a seed file which will add a demo user to our User table.',
    tagList: ['postgres', 'express', 'sequelize'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '263920cd-c7ad-45b0-a5d9-d12f7fe237c3',
    title: 'What is a Version 1 UUID?',
    slug: 'What-is-a-Version-1-UUID?',
    description: 'Velit non sit culpa pariatur proident',
    body: 'A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the MAC address of the computer on which it was generated.',
    tagList: ['UUID', 'express', 'sequelize'],
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('articles', null, {})
};
