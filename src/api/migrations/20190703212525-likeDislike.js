export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LikeDislikes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    commentId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Comments', key: 'id' }
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
    },
    likes: {
      type: Sequelize.INTEGER
    },
    dislikes: {
      type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('LikeDislikes')
};
