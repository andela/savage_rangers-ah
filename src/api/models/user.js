const user = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    }
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
