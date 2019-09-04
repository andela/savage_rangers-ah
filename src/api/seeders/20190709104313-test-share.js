

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Shares',
    [
      {
        articleSlug: 'How-to-create-sequalize-seeds',
        sharedOn: 'facebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        articleSlug: 'How-to-create-sequalize-seeds',
        sharedOn: 'facebook',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Shares', null, {})
};
