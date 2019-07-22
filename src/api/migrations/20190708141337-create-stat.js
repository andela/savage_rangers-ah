export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reads', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    articleSlug: {
      type: Sequelize.STRING,
      references: { model: 'Articles', key: 'slug' },
      onDelete: 'CASCADE'
    },
    userIp: { type: Sequelize.STRING },
    userAgent: { type: Sequelize.STRING },
    userId: {
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' }
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Reads')
};
