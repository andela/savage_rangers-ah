export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    body: { type: Sequelize.TEXT, allowNull: false },
    slug: { type: Sequelize.STRING, allowNull: false },
    image: { type: Sequelize.TEXT, allowNull: false },
    author: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    category: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'categories', key: 'id' }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('articles')
};
