'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shares', [
      {
        articleSlug: 'How-to-create-sequalize-seeds',
        userId: 1,
        sharedOn: 'facebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        articleSlug: 'How-to-create-sequalize-seeds',
        userId: 2,
        sharedOn: 'facebook',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shares', null, {});
  }
};
