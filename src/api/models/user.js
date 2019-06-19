const user = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  });

  User.findByEmail = (email) => {
    const queryResult = User.findOne({
      where: { email },
    });

    return queryResult;
  };

  return User;
};

export default user;
