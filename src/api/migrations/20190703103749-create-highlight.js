export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Highlights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startIndex: {
        type: Sequelize.INTEGER
      },
      lastIndex: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      articleSlug: {
        type: Sequelize.STRING,
        references: { model: 'Articles', key: 'slug' }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Highlights');
  }
};
