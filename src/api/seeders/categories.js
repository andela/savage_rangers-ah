const moment = require('moment');

const createdAt = moment().format();
const updatedAt = createdAt;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('categories',
    [
      {
        name: 'LOVE',
        id: 1,
        createdAt,
        updatedAt
      },
      {
        name: 'MUSIC',
        id: 2,
        createdAt,
        updatedAt
      },
      {
        name: 'ART',
        id: 3,
        createdAt,
        updatedAt
      }
    ],
    {}),

  down: queryInterface => queryInterface.bulkDelete('categories', null, {})
};
