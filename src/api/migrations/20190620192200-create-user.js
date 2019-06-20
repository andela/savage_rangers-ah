export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    profileImage: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    provider: {
      type: Sequelize.STRING,
      allowNull: true
    },
    uniqueId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    facebook: {
      type: Sequelize.STRING
    },
    twitter: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
