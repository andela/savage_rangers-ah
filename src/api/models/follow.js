export default (sequelize, DataTypes) => {
  const follow = sequelize.define('follow', {
    follower: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'username'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    following: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'username'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    }
  }, {});

  follow.removeAttribute('id');
  follow.associate = (models) => {
    follow.belongsTo(models.User, {
      foreignKey: 'username',
    });
  };
  return follow;
};
