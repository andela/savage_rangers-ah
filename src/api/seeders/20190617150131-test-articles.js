
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('article', [{
    title: 'How to create sequalize seeds',
    description: 'How to set dummy data automatically',
    body: 'Suppose we want to insert some data into a few tables by default. If we follow up on previous example we can consider creating a demo user for User table.To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database table with sample data or test data.Let\'s create a seed file which will add a demo user to our User table.',
    tagList: ['postgres', 'express', 'sequelize']
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('article', null, {})
};
