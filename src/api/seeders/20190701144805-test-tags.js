export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Tags',
      [
        {
          name: 'Iot',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Iot2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Iot3',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}),
    queryInterface.bulkInsert('ArticlesTags',
      [
        {
          articleId: 1,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          articleId: 2,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          articleId: 2,
          tagId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {})
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Articles', null, {}),
    queryInterface.bulkDelete('ArticlesTags', null, {})
  ])
};
