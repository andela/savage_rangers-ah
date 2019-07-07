module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Reports',
    [
      {
        userId: 12,
        reportedArticleSlug: 'How-to-create-sequalize-seeds',
        reasonId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 13,
        reportedArticleSlug: 'How-to-create-sequalize-seedss',
        reasonId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: queryInterface => queryInterface.bulkDelete('Reports', null, {})
};
