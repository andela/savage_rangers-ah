module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories',
    [
      {
        name: 'LOVE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MUSIC',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ART',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'TECHNOLOGY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BUSINESS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ENTERTAINMENT',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
