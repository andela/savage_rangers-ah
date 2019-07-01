export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    body: { type: Sequelize.TEXT, allowNull: false },
    slug: { type: Sequelize.STRING, allowNull: false, unique: true },
    coverImage: { type: Sequelize.TEXT, allowNull: false },
    tagList: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true
    },

    author: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    },
    category: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Categories', key: 'id' }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Articles')
};
