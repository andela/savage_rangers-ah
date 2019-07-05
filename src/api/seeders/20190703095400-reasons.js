module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Reasons',
    [
      {
        description: 'It contains violent content',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'this content exploits the minors',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'this content is being used for harassment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'this content is a spam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'this content violates the privacy of someone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'this content violates the copyright and trademark infringement',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: queryInterface => queryInterface.bulkDelete('Reasons', null, {})
};
