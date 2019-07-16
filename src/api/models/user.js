export default (sequelize, DataTypes) => {
  const User = sequelize.define('Users',
    {
      username: {
        type: DataTypes.STRING,
        unique: true
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
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'normal'
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { tableName: 'Users' });
  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'author',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      hooks: true
    });

    User.hasMany(models.Rating, {
      foreignKey: 'userId' 
    });
    User.hasMany(models.Bookmark, {
      foreignKey: 'username',
    });
    User.hasMany(models.Highlight, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Following, {
      foreignKey: 'follower'
    });
    User.hasMany(models.Following, {
      foreignKey: 'following'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Report, {
      foreignKey: 'userId',
      sourceId: 'id',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  User.findByEmail = (email) => {
    const queryResult = User.findOne({ where: { email } });

    return queryResult;
  };
  
  return User;
};
