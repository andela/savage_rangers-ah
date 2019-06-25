export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('follows', {
      follower: {
        type: Sequelize.STRING,
        unique: true,
        references: {
          model: 'Users',
          key: 'username'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      following: {
        type: Sequelize.STRING,
        unique: true,
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
    }).then(() => queryInterface.addConstraint('follows', ['follower', 'following'], {
      type: 'primary key',
      name: 'followId'
    }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('follows');
  }
};