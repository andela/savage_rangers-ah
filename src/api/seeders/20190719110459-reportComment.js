module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ReportComments',
    [
      {
        userId: 1,
        reportedCommentId: 6,
        reasonId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        reportedCommentId: 6,
        reasonId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: queryInterface => queryInterface.bulkDelete('ReportComments', null, {})
};
