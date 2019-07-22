export default {
  up: queryInterface => queryInterface.bulkInsert('ReportComments',
    [
      {
        userId: 12,
        reportedCommentId: 5,
        reasonId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 13,
        reportedCommentId: 6,
        reasonId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: queryInterface => queryInterface.bulkDelete('ReportComments', null, {})
};
