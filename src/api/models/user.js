export default (sequelize, DataTypes) => {
  const User = sequelize.define('Users',
    {
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      profileImage: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true
      },
      uniqueId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      facebook: {
        type: DataTypes.STRING
      },
      twitter: {
        type: DataTypes.STRING
      }
    },
    {});

  User.findByEmail = (email) => {
    const queryResult = User.findOne({
      where: { email }
    });
    return queryResult;
  };
  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId'
    });
  };
  return User;
};
