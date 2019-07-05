export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
      unique: false
    },
    reportedArticleSlug: {
      type: Sequelize.STRING,
      references: {
        model: 'Articles',
        key: 'slug'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
      unique: false
    },
    reasonId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Reasons',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
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
  //
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Reports')
};
