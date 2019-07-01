export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookmarks', {
      articleSlug: {
        type: Sequelize.STRING,
        references: {
          model: 'Articles',
          key: 'slug'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username'
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
    })
    .then(() =>
    queryInterface
      .addConstraint('Bookmarks', ['articleSlug', 'username'], {
        type: 'primary key',
        name: 'bookmarkId'
      })
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookmarks');
  }
};
