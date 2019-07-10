import { sequelize } from '../models';

export default {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
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
      parentCommentId: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    .then(() => sequelize.query(`ALTER TABLE "Comments"
     ADD CONSTRAINT fk_parentReference FOREIGN KEY ("parentCommentId")
     REFERENCES "Comments" (id) ON DELETE CASCADE`)),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Comments')
};
