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
