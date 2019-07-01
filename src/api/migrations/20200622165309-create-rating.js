export default {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Ratings', {
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
      articleSlug: {
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
      rating: {
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
    })
    .then(() => queryInterface.addConstraint('Ratings', ['userId', 'articleSlug'], {
      type: 'primary key',
      name: 'userRating'
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Ratings')
};
